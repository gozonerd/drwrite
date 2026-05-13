<#
.SYNOPSIS
  Detect Claude Desktop + Claude Code installation paths on Windows.

.DESCRIPTION
  Returns a hashtable with detected paths for all known Claude installations.
  Handles MSIX (Microsoft Store / WinGet) AND traditional installer paths,
  plus OneDrive-redirection of the user profile.

  Per app-update-rec SKILL.md Pre-flight Step 1.
#>

[CmdletBinding()]
param(
    [switch]$AsJson
)

$result = [ordered]@{
    OneDriveRedirected           = $false
    UserProfileReal              = $env:USERPROFILE
    ClaudeDesktopMSIX            = $null
    ClaudeDesktopTraditional     = $null
    ClaudeDesktopAnthropicLocal  = $null
    ClaudeCodeUser               = $null
    ClaudeCodeProjects           = @()
    GrandRepoWorktrees           = @()
    DetectedClaudeDesktopVersion = $null
    DetectedClaudeCodeVersion    = $null
}

# OneDrive detection — Known Folder Move can redirect Documents/Desktop
if ($env:OneDrive -and (Test-Path $env:OneDrive)) {
    $userProfileResolved = (Get-Item $env:USERPROFILE -ErrorAction SilentlyContinue).Target
    if ($userProfileResolved) {
        $result.OneDriveRedirected = $true
        $result.UserProfileReal    = $userProfileResolved
    }
}

# Claude Desktop MSIX (Store / WinGet)
# Note: Claude Desktop on Windows installs the MSIX package, BUT writes its
# actual config + state to the traditional %APPDATA%\Claude path (detected
# separately below as ClaudeDesktopTraditional). The MSIX package dir at
# %LOCALAPPDATA%\Packages\Claude_pzs8sxrjxfjjc\ contains only MSIX scaffolding.
# We detect the MSIX install for version tracking / completeness, but the
# Traditional path is what carries the backup-worthy state.
try {
    $msixPackage = Get-AppxPackage -Name "*Claude*" -ErrorAction SilentlyContinue |
                   Where-Object { $_.Publisher -match 'Anthropic' } |
                   Select-Object -First 1
    if ($msixPackage) {
        $result.DetectedClaudeDesktopVersion = $msixPackage.Version
        $msixCache = Join-Path $env:LOCALAPPDATA "Packages\$($msixPackage.PackageFamilyName)"
        if (Test-Path $msixCache) {
            # Surface the package family dir as MSIX path (mostly scaffolding,
            # but Settings/LocalState may contain installer-related state worth
            # snapshotting).
            $result.ClaudeDesktopMSIX = $msixCache
        }
    }
} catch {
    # Get-AppxPackage requires the Appx module + Server SKUs may lack it.
    # Failure here is non-fatal — Traditional path detection catches the
    # actual data on this machine.
}

# Claude Desktop traditional installer
$tradPath = Join-Path $env:APPDATA "Claude"
if (Test-Path $tradPath) { $result.ClaudeDesktopTraditional = $tradPath }

$anthLocal = Join-Path $env:LOCALAPPDATA "AnthropicClaude"
if (Test-Path $anthLocal) { $result.ClaudeDesktopAnthropicLocal = $anthLocal }

# Claude Code user-level dir
$ccUser = Join-Path $result.UserProfileReal ".claude"
if (Test-Path $ccUser) {
    $result.ClaudeCodeUser = $ccUser

    # Enumerate per-project memory dirs (the irreplaceable Tier 1 sources)
    $projectsDir = Join-Path $ccUser "projects"
    if (Test-Path $projectsDir) {
        $result.ClaudeCodeProjects = Get-ChildItem $projectsDir -Directory -ErrorAction SilentlyContinue |
            Where-Object { Test-Path (Join-Path $_.FullName "memory") } |
            ForEach-Object { @{ Name = $_.Name; MemoryPath = (Join-Path $_.FullName "memory") } }
    }
}

# _grand_repo worktrees (gitignored ephemeral but may have uncommitted work)
$grandRepo = Join-Path $result.UserProfileReal "_grand_repo"
$worktreesDir = Join-Path $grandRepo ".claude\worktrees"
if (Test-Path $worktreesDir) {
    $result.GrandRepoWorktrees = Get-ChildItem $worktreesDir -Directory -ErrorAction SilentlyContinue |
        ForEach-Object { $_.FullName }
}

# Claude Code CLI version (best-effort)
try {
    $ccVersion = & claude --version 2>$null
    if ($LASTEXITCODE -eq 0 -and $ccVersion) {
        $result.DetectedClaudeCodeVersion = ($ccVersion | Select-Object -First 1).Trim()
    }
} catch { }

if ($AsJson) {
    $result | ConvertTo-Json -Depth 5
} else {
    $result
}
