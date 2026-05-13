<#
.SYNOPSIS
  Restore from a snapshot taken by Backup-ClaudeState.ps1.

.DESCRIPTION
  Per app-update-rec SKILL.md Restore phase. Symmetric to Backup-ClaudeState.
  Default is dry-run. Refuses to overwrite non-empty memory dir without -Force.

.PARAMETER SnapshotId
  The timestamp directory name, e.g. 2026-05-12_233801. Required.

.PARAMETER BackupRoot
  Local backup root. Default: auto-detect via Get-AppPaths logic.

.PARAMETER FromGitHub
  Pull the snapshot from nerdykrystal/backups instead of expecting it locally.
  Downloads the release asset for snapshot-<SnapshotId>.

.PARAMETER Component
  Memory | Dotclaude | Config | Worktrees | All. Default: All.

.PARAMETER DryRun
  Preview only. Default: enabled. Pass -DryRun:$false (or use -Force) to actually write.

.PARAMETER Force
  Required to overwrite non-empty memory dir. Implies -DryRun:$false.

.PARAMETER GitHubRepo
  Default: nerdykrystal/backups.
#>

[CmdletBinding()]
param(
    [Parameter(Mandatory)] [string]$SnapshotId,
    [string]                       $BackupRoot   = $null,
    [switch]                       $FromGitHub,
    [ValidateSet('Memory','Dotclaude','Config','Worktrees','All')]
    [string]                       $Component    = 'All',
    [switch]                       $DryRun       = $true,
    [switch]                       $Force,
    [string]                       $GitHubRepo   = 'nerdykrystal/backups'
)

$ErrorActionPreference = 'Stop'
if ($Force) { $DryRun = $false }

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$paths     = & (Join-Path $scriptDir 'Get-AppPaths.ps1')

# Pre-flight: refuse if Claude apps running
& (Join-Path $scriptDir 'Test-AppRunning.ps1')
if ($LASTEXITCODE -ne 0) { Write-Error "Refuse-if-running tripped."; exit 1 }

# Locate snapshot dir
if ($FromGitHub) {
    $tempDir = Join-Path $env:TEMP "restore-$SnapshotId"
    if (Test-Path $tempDir) { Remove-Item $tempDir -Recurse -Force }
    New-Item -ItemType Directory -Force -Path $tempDir | Out-Null
    Write-Host "Downloading snapshot-$SnapshotId from $GitHubRepo ..." -ForegroundColor Cyan
    & gh release download "snapshot-$SnapshotId" --repo $GitHubRepo --dir $tempDir 2>&1 | Out-Null
    $zip = Get-ChildItem $tempDir -Filter "*.zip" | Select-Object -First 1
    if (-not $zip) { Write-Error "No release asset found for snapshot-$SnapshotId"; exit 3 }
    Expand-Archive -Path $zip.FullName -DestinationPath $tempDir -Force
    $snapshotDir = $tempDir
} else {
    if (-not $BackupRoot) {
        $candidates = Get-PSDrive -PSProvider FileSystem |
            Where-Object { Test-Path "$($_.Root)claude-backups\$SnapshotId" }
        if ($candidates) { $BackupRoot = "$($candidates[0].Root)claude-backups" }
        else             { $BackupRoot = "C:\claude-backups" }
    }
    $snapshotDir = Join-Path $BackupRoot $SnapshotId
    if (-not (Test-Path $snapshotDir)) {
        Write-Error "Snapshot not found: $snapshotDir. Try -FromGitHub."; exit 3
    }
}

$manifestPath = Join-Path $snapshotDir 'manifest.json'
if (-not (Test-Path $manifestPath)) {
    Write-Error "Manifest missing: $manifestPath. Snapshot incomplete or corrupted."; exit 4
}
$manifest = Get-Content $manifestPath -Raw | ConvertFrom-Json
Write-Host "`nSnapshot $SnapshotId" -ForegroundColor Green
Write-Host "  Created: $($manifest.created_utc)"
Write-Host "  Verdict: $($manifest.verdict)"
Write-Host "  About to install version: $($manifest.version_about_to_install)"
Write-Host "  Mode: $(if ($DryRun) {'DRY-RUN (preview only)'} else {'WRITE'})"
Write-Host ""

function Restore-Tier {
    param([string]$Name, [string]$Source, [string]$Target, [bool]$RequireForce = $false)

    if (-not (Test-Path $Source)) {
        Write-Host "  [$Name] source missing in snapshot — skip" -ForegroundColor Yellow; return
    }
    $hasContent = Test-Path $Target -PathType Container -ErrorAction SilentlyContinue
    if ($hasContent -and $RequireForce -and -not $Force) {
        Write-Warning "  [$Name] target exists and is non-empty: $Target"
        Write-Warning "  Refusing to overwrite without -Force. (Memory tier safety per SKILL.md.)"
        return
    }
    if ($DryRun) {
        $files = (Get-ChildItem $Source -Recurse -File -ErrorAction SilentlyContinue)
        Write-Host "  [$Name] would restore $($files.Count) files to $Target" -ForegroundColor Cyan
    } else {
        if (-not (Test-Path $Target)) { New-Item -ItemType Directory -Force -Path $Target | Out-Null }
        & robocopy $Source $Target /COPY:DAT /R:2 /W:1 /MT:8 /XJ /NP /LOG:(Join-Path $snapshotDir "restore-$Name.log") | Out-Null
        if ($LASTEXITCODE -ge 8) {
            Write-Error "  [$Name] robocopy failed (exit $LASTEXITCODE). See restore-$Name.log."
        } else {
            Write-Host "  [$Name] restored to $Target" -ForegroundColor Green
        }
    }
}

# Memory restore
if ($Component -in 'Memory','All') {
    Write-Host "Memory tier:" -ForegroundColor Cyan
    foreach ($mem in $manifest.tiers.memory) {
        # mem.source from manifest is the original path; restore there
        $relName = Split-Path -Leaf (Split-Path -Parent $mem.source)
        $snapMemDir = Join-Path $snapshotDir "memory\$relName"
        Restore-Tier -Name "memory-$relName" -Source $snapMemDir -Target $mem.source -RequireForce $true
    }
    # Re-hash and verify if writing
    if (-not $DryRun) {
        Write-Host "  Verifying memory tier hashes..." -ForegroundColor Cyan
        foreach ($mem in $manifest.tiers.memory) {
            if ($mem.sha256 -and (Test-Path $mem.source)) {
                $hashes = Get-ChildItem $mem.source -Recurse -File | Sort-Object FullName |
                    ForEach-Object { (Get-FileHash $_.FullName -Algorithm SHA256).Hash }
                $newHash = (Get-FileHash -InputStream ([IO.MemoryStream]::new([Text.Encoding]::UTF8.GetBytes(($hashes -join '|')))) -Algorithm SHA256).Hash
                if ($newHash -eq $mem.sha256) {
                    Write-Host "  [verify] $($mem.source) matches manifest SHA256." -ForegroundColor Green
                } else {
                    Write-Warning "  [verify] $($mem.source) hash mismatch. Expected $($mem.sha256), got $newHash."
                }
            }
        }
    }
}

# Dotclaude
if ($Component -in 'Dotclaude','All') {
    Write-Host "`nDotclaude tier:" -ForegroundColor Cyan
    if ($manifest.tiers.dotclaude) {
        Restore-Tier -Name 'dotclaude' -Source (Join-Path $snapshotDir 'dotclaude') -Target $manifest.tiers.dotclaude.source -RequireForce $true
    }
}

# Config
if ($Component -in 'Config','All') {
    Write-Host "`nConfig tier:" -ForegroundColor Cyan
    if ($manifest.tiers.config) {
        foreach ($cfg in $manifest.tiers.config) {
            $cfgName = Split-Path -Leaf $cfg.dest
            Restore-Tier -Name "config-$cfgName" -Source $cfg.dest -Target $cfg.source -RequireForce $false
        }
    }
}

# Worktrees (git bundles — requires manual fetch; auto-restore is risky)
if ($Component -in 'Worktrees','All') {
    Write-Host "`nWorktree-bundles tier:" -ForegroundColor Cyan
    if ($manifest.tiers.worktrees_dirty) {
        foreach ($wt in $manifest.tiers.worktrees_dirty) {
            Write-Host "  $($wt.name): bundle at $($wt.bundle), HEAD was $($wt.git_head), $($wt.dirty_lines) dirty/untracked lines"
            Write-Host "    To inspect:    git bundle list-heads `"$($wt.bundle)`""
            Write-Host "    To verify:     git -C `"$($wt.worktree)`" bundle verify `"$($wt.bundle)`""
            Write-Host "    To fetch:      git -C `"$($wt.worktree)`" fetch `"$($wt.bundle)`" '*:bundle/*'"
            Write-Host "    Then inspect the bundle/* refs and merge/cherry-pick selectively."
        }
        Write-Host "  Worktree bundles are NOT auto-restored — they may overwrite work the user has done since the snapshot. Review each one with Krystal first." -ForegroundColor Yellow
    } else {
        Write-Host "  No dirty worktrees were captured in this snapshot." -ForegroundColor Green
    }
}

Write-Host ""
if ($DryRun) {
    Write-Host "DRY-RUN complete. To actually write, re-run with -Force." -ForegroundColor Yellow
} else {
    Write-Host "Restore complete." -ForegroundColor Green
}
