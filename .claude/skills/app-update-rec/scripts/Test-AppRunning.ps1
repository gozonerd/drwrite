<#
.SYNOPSIS
  Detect any running Claude application or Claude Code CLI process.

.DESCRIPTION
  Returns running-process info. If any matching processes are found, the script
  exits with code 1 and prints a copy-pasteable kill-list. Per app-update-rec
  SKILL.md Pre-flight Step 2 + locked decision #3 (refuse-if-running, no override).

.PARAMETER Quiet
  Suppress process-table output. Exit code still signals running/not-running.

.OUTPUTS
  Array of process objects with Name, Id, MainWindowTitle, Path.
  Exit code 0 = nothing running. Exit code 1 = at least one Claude process running.
#>

[CmdletBinding()]
param(
    [switch]$Quiet
)

# Process names known to be Anthropic-published Claude apps.
# Per locked decision #6: Claude Desktop + Claude Code only.
# Cursor / JetBrains AI / VS Code Claude ext are out of v1 scope.
# PowerShell process matching is case-insensitive — list distinct names only.
$claudeProcessNames = @(
    'Claude Helper',   # Claude Desktop helper
    'ClaudeDesktop',   # Alternate naming
    'claude',          # Both Claude Desktop main process AND Claude Code CLI
    'AnthropicClaude'  # Traditional installer process name
)

$running = @{}
foreach ($name in $claudeProcessNames) {
    $procs = Get-Process -Name $name -ErrorAction SilentlyContinue
    if ($procs) {
        foreach ($p in $procs) {
            # Deduplicate by PID across name matches
            if (-not $running.ContainsKey($p.Id)) {
                $running[$p.Id] = [PSCustomObject]@{
                    Name        = $p.Name
                    Id          = $p.Id
                    WindowTitle = $p.MainWindowTitle
                    Path        = try { $p.Path } catch { '<protected>' }
                }
            }
        }
    }
}
$running = $running.Values | Sort-Object Id

if (@($running).Count -gt 0) {
    if (-not $Quiet) {
        Write-Host "REFUSE: Claude process(es) running. Quit before re-running app-update-rec." -ForegroundColor Red
        $running | Format-Table -AutoSize | Out-String | Write-Host
        Write-Host "Kill all (use cautiously — closes apps without saving):" -ForegroundColor Yellow
        $killCmd = "Stop-Process -Id " + (($running | ForEach-Object { $_.Id }) -join ',') + " -Force"
        Write-Host "  $killCmd" -ForegroundColor Yellow
    }
    exit 1
}

if (-not $Quiet) {
    Write-Host "OK: no Claude processes running." -ForegroundColor Green
}
exit 0
