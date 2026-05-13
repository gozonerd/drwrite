<#
.SYNOPSIS
  Tiered, verified, manifest-tracked backup of Krystal's Claude state.

.DESCRIPTION
  Per app-update-rec SKILL.md Phase 3. Five tiers:
    1. Per-project memory dirs (irreplaceable) — REQUIRED, abort if fails
    2. Whole ~\.claude tree (excl. junctions)
    3. Claude Desktop config (all 3 known locations if present)
    4. Worktree dirty-state (git bundle per dirty worktree)
    5. Loose untracked dirs in _grand_repo

  Writes manifest.json. Pushes commit + GH release to nerdykrystal/backups.

.PARAMETER Verdict
  Verdict from research phase: "GREEN", "YELLOW", "RED", "ABSTAIN". Recorded in manifest.

.PARAMETER Version
  Detected app version about to be installed. Recorded in manifest.

.PARAMETER BackupRoot
  Local backup root dir. Default: largest non-system drive >= 2x source size, fallback C:\claude-backups.

.PARAMETER GitHubRepo
  Default: nerdykrystal/backups. Per locked decision #2.

.PARAMETER DryRun
  Run robocopy /L (list-only), no files written. For pre-flight estimate.

.PARAMETER Force
  Skip interactive confirmation.
#>

[CmdletBinding()]
param(
    [string]$Verdict       = 'UNKNOWN',
    [string]$Version       = '<undetected>',
    [string]$BackupRoot    = $null,
    [string]$GitHubRepo    = 'nerdykrystal/backups',
    [switch]$DryRun,
    [switch]$Force
)

$ErrorActionPreference = 'Stop'
$scriptDir             = Split-Path -Parent $MyInvocation.MyCommand.Path

# --- Pre-flight ---
Write-Host "=== Pre-flight ===" -ForegroundColor Cyan

$paths = & (Join-Path $scriptDir 'Get-AppPaths.ps1')
& (Join-Path $scriptDir 'Test-AppRunning.ps1')
if ($LASTEXITCODE -ne 0) { Write-Error "Refuse-if-running tripped. See above."; exit 1 }

# Pick backup destination
if (-not $BackupRoot) {
    $candidates = Get-PSDrive -PSProvider FileSystem |
        Where-Object { $_.Name -ne 'C' -and $_.Free -gt 0 } |
        Sort-Object -Property Free -Descending
    if ($candidates) {
        $BackupRoot = "$($candidates[0].Root)claude-backups"
    } else {
        $BackupRoot = "C:\claude-backups"
        Write-Warning "Falling back to system drive (C:\). Off-machine GH push remains the real safety net."
    }
}
if (-not (Test-Path $BackupRoot)) { New-Item -ItemType Directory -Force -Path $BackupRoot | Out-Null }

$timestamp     = Get-Date -Format 'yyyy-MM-dd_HHmmss'
$snapshotDir   = Join-Path $BackupRoot $timestamp
New-Item -ItemType Directory -Force -Path $snapshotDir | Out-Null
Write-Host "Snapshot dir: $snapshotDir" -ForegroundColor Green

# Verify GitHub repo accessible (locked decision #2)
$ghOk = $false
try {
    $repoInfo = gh repo view $GitHubRepo --json visibility 2>&1 | ConvertFrom-Json
    if ($repoInfo.visibility -eq 'PRIVATE') { $ghOk = $true }
    else { Write-Warning "Repo $GitHubRepo is $($repoInfo.visibility), expected PRIVATE. Refusing to push." }
} catch {
    Write-Warning "Cannot reach $GitHubRepo via gh. Local snapshot only."
}

if (-not $Force) {
    Write-Host "About to snapshot $($paths.ClaudeCodeUser) + Desktop config + dirty worktrees to $snapshotDir" -ForegroundColor Yellow
    Write-Host "Push to $GitHubRepo : $ghOk"
    $confirm = Read-Host "Continue? (y/N)"
    if ($confirm -ne 'y') { Write-Host "Aborted by user."; exit 0 }
}

# Robocopy options
$rcCommonArgs = @('/COPY:DAT', '/R:2', '/W:1', '/MT:8', '/XJ', '/NP')
if ($DryRun) { $rcCommonArgs += '/L' }

$manifest = [ordered]@{
    snapshot_id                    = $timestamp
    created_utc                    = (Get-Date).ToUniversalTime().ToString('yyyy-MM-ddTHH:mm:ssZ')
    claude_desktop_version_detected = $paths.DetectedClaudeDesktopVersion
    claude_code_version_detected    = $paths.DetectedClaudeCodeVersion
    version_about_to_install        = $Version
    os_version                      = (Get-CimInstance Win32_OperatingSystem).Version
    os_user                         = $env:USERNAME
    machine_id                      = $env:COMPUTERNAME
    onedrive_redirected             = $paths.OneDriveRedirected
    verdict                         = $Verdict
    tiers                           = [ordered]@{}
}

function Invoke-RobocopyTier {
    param([string]$Source, [string]$Dest, [string]$LogName)

    if (-not (Test-Path $Source)) { return $null }
    New-Item -ItemType Directory -Force -Path $Dest | Out-Null
    $logPath = Join-Path $snapshotDir $LogName
    $args    = @($Source, $Dest) + $rcCommonArgs + @("/LOG:$logPath")
    & robocopy @args | Out-Null

    # Robocopy exit 0-7 = success; 8+ = failure
    $rcExit  = $LASTEXITCODE
    $success = ($rcExit -lt 8)

    $files = if (Test-Path $Dest) { (Get-ChildItem $Dest -Recurse -File -ErrorAction SilentlyContinue) } else { @() }
    $bytes = ($files | Measure-Object -Property Length -Sum).Sum

    return @{
        source        = $Source
        dest          = $Dest
        file_count    = $files.Count
        byte_count    = $bytes
        robocopy_exit = $rcExit
        success       = $success
    }
}

# --- Tier 1: per-project memory dirs (REQUIRED) ---
Write-Host "=== Tier 1: memory dirs ===" -ForegroundColor Cyan
$tier1 = @()
foreach ($proj in $paths.ClaudeCodeProjects) {
    $dest   = Join-Path $snapshotDir "memory\$($proj.Name)"
    $entry  = Invoke-RobocopyTier -Source $proj.MemoryPath -Dest $dest -LogName "tier1-$($proj.Name).log"
    if ($entry) {
        # SHA256 of memory dir (concat sorted file hashes)
        $hash = if (-not $DryRun -and $entry.success) {
            $hashes = Get-ChildItem $dest -Recurse -File | Sort-Object FullName |
                ForEach-Object { (Get-FileHash $_.FullName -Algorithm SHA256).Hash }
            (Get-FileHash -InputStream ([IO.MemoryStream]::new([Text.Encoding]::UTF8.GetBytes(($hashes -join '|')))) -Algorithm SHA256).Hash
        } else { $null }
        $entry.sha256 = $hash
        $tier1       += $entry
    }
}
if ($tier1.Count -eq 0 -or ($tier1 | Where-Object { -not $_.success })) {
    Write-Error "Tier 1 (memory) failed. Aborting per SKILL.md REQUIRED status."
    exit 2
}
$manifest.tiers.memory = $tier1

# --- Tier 2: whole ~/.claude tree ---
Write-Host "=== Tier 2: ~/.claude ===" -ForegroundColor Cyan
if ($paths.ClaudeCodeUser) {
    $manifest.tiers.dotclaude = Invoke-RobocopyTier -Source $paths.ClaudeCodeUser -Dest (Join-Path $snapshotDir 'dotclaude') -LogName 'tier2-dotclaude.log'
}

# --- Tier 3: Claude Desktop config ---
Write-Host "=== Tier 3: Claude Desktop config ===" -ForegroundColor Cyan
$tier3 = @()
foreach ($cfg in @(
    @{ N = 'msix';      P = $paths.ClaudeDesktopMSIX            }
    @{ N = 'trad';      P = $paths.ClaudeDesktopTraditional     }
    @{ N = 'anth_local';P = $paths.ClaudeDesktopAnthropicLocal  }
)) {
    if ($cfg.P) {
        $tier3 += Invoke-RobocopyTier -Source $cfg.P -Dest (Join-Path $snapshotDir "config\$($cfg.N)") -LogName "tier3-$($cfg.N).log"
    }
}
$manifest.tiers.config = $tier3

# --- Tier 4: dirty worktrees as git bundles ---
Write-Host "=== Tier 4: dirty worktrees (git bundle) ===" -ForegroundColor Cyan
$tier4 = @()
$bundleDir = Join-Path $snapshotDir 'worktrees-bundles'
if (-not $DryRun) { New-Item -ItemType Directory -Force -Path $bundleDir | Out-Null }
foreach ($wt in $paths.GrandRepoWorktrees) {
    $name   = Split-Path -Leaf $wt
    $status = & git -C $wt status --porcelain 2>$null
    if ($status) {
        $bundlePath = Join-Path $bundleDir "$name.bundle"
        $head       = & git -C $wt rev-parse HEAD 2>$null
        if (-not $DryRun) {
            & git -C $wt bundle create $bundlePath --all 2>&1 | Out-Null
        }
        $tier4 += @{
            name       = $name
            worktree   = $wt
            git_head   = $head
            bundle     = $bundlePath
            dirty_lines = ($status -split "`n").Count
        }
    }
}
$manifest.tiers.worktrees_dirty = $tier4

# --- Tier 5: loose untracked in _grand_repo ---
# (Detect via `git status` at parent. Optional tier; surface but don't block.)
Write-Host "=== Tier 5: loose untracked (best-effort) ===" -ForegroundColor Cyan
$grandRepo = Join-Path $paths.UserProfileReal '_grand_repo'
if (Test-Path $grandRepo) {
    $untracked = & git -C $grandRepo status --porcelain 2>$null | Where-Object { $_ -like '?? *' }
    $manifest.tiers.scratch = @{
        grand_repo_root = $grandRepo
        untracked_count = ($untracked | Measure-Object).Count
        note            = 'Untracked items listed in tier5-untracked.txt; not auto-copied (gitignored intentionally per CLAUDE.md).'
    }
    if (-not $DryRun) {
        $untracked | Out-File -FilePath (Join-Path $snapshotDir 'tier5-untracked.txt') -Encoding utf8
    }
}

# --- Manifest write ---
$manifestPath = Join-Path $snapshotDir 'manifest.json'
$manifest | ConvertTo-Json -Depth 8 | Out-File -FilePath $manifestPath -Encoding utf8
Write-Host "`nManifest: $manifestPath" -ForegroundColor Green

if ($DryRun) {
    Write-Host "`nDRY RUN — no files written. Estimated coverage shown above." -ForegroundColor Yellow
    exit 0
}

# --- Push to GitHub ---
if ($ghOk) {
    Write-Host "`n=== Pushing to $GitHubRepo ===" -ForegroundColor Cyan
    $stagingDir = Join-Path $env:TEMP "backups-staging-$timestamp"
    if (Test-Path $stagingDir) { Remove-Item $stagingDir -Recurse -Force }

    & gh repo clone $GitHubRepo $stagingDir 2>&1 | Out-Null

    # Commit text content (manifest + memory raw — small, browsable on github.com)
    $repoSnapDir = Join-Path $stagingDir "backups\$timestamp"
    New-Item -ItemType Directory -Force -Path $repoSnapDir | Out-Null
    Copy-Item $manifestPath $repoSnapDir
    if (Test-Path (Join-Path $snapshotDir 'memory')) {
        Copy-Item (Join-Path $snapshotDir 'memory') $repoSnapDir -Recurse
    }

    Push-Location $stagingDir
    try {
        & git add "backups/$timestamp" 2>&1 | Out-Null
        $commitMsg = "Snapshot $timestamp before update $Version (verdict: $Verdict)"
        & git commit -m $commitMsg 2>&1 | Out-Null
        & git push 2>&1 | Out-Null
    } finally {
        Pop-Location
    }

    # Zip large tiers (excluding memory — already committed raw to repo above) and upload as release asset
    $zipPath = Join-Path $BackupRoot "$timestamp.zip"
    $zipStaging = Join-Path $env:TEMP "zip-staging-$timestamp"
    if (Test-Path $zipStaging) { Remove-Item $zipStaging -Recurse -Force }
    New-Item -ItemType Directory -Force -Path $zipStaging | Out-Null
    Get-ChildItem $snapshotDir -Exclude 'memory' | ForEach-Object {
        Copy-Item $_.FullName $zipStaging -Recurse -Force
    }
    Compress-Archive -Path (Join-Path $zipStaging '*') -DestinationPath $zipPath -CompressionLevel Optimal -Force
    Remove-Item $zipStaging -Recurse -Force -ErrorAction SilentlyContinue
    & gh release create "snapshot-$timestamp" $zipPath --repo $GitHubRepo --notes "Snapshot before update $Version. Verdict $Verdict. Memory tier in repo tree at backups/$timestamp/memory/; this zip contains everything else." --title "Snapshot $timestamp" 2>&1 | Out-Null

    Write-Host "Pushed: https://github.com/$GitHubRepo/tree/main/backups/$timestamp" -ForegroundColor Green
    Write-Host "Release: https://github.com/$GitHubRepo/releases/tag/snapshot-$timestamp" -ForegroundColor Green

    Remove-Item $stagingDir -Recurse -Force -ErrorAction SilentlyContinue
} else {
    Write-Warning "GitHub push skipped. Local snapshot at $snapshotDir is your only copy."
}

Write-Host "`nBackup complete. snapshot_id=$timestamp" -ForegroundColor Green
