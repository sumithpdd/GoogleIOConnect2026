# Scan tracked files for common secret patterns (run from repo root).
$ErrorActionPreference = 'Stop'
Set-Location (Split-Path -Parent $PSScriptRoot)

Write-Host "=== Secret safety scan ===" -ForegroundColor Cyan

$fail = $false

function Fail($msg) {
  Write-Host "FAIL: $msg" -ForegroundColor Red
  $script:fail = $true
}

function Pass($msg) {
  Write-Host "PASS: $msg" -ForegroundColor Green
}

# 1. Ignored secret files
$serviceAccountFiles = Get-ChildItem -Path . -Filter '*-firebase-adminsdk-*.json' -File -ErrorAction SilentlyContinue
foreach ($f in @('.env.local') + @($serviceAccountFiles | ForEach-Object { $_.Name })) {
  if (Test-Path $f) {
    $ignored = git check-ignore -q $f 2>$null
    if ($LASTEXITCODE -eq 0) { Pass "$f is gitignored" }
    else { Fail "$f exists but is NOT gitignored" }
  }
}

# 2. Tracked env / service account files
$tracked = git ls-files | Select-String -Pattern 'firebase-adminsdk|\.env\.local' -SimpleMatch
if ($tracked) { Fail "Tracked secret paths:`n$tracked" }
else { Pass "No firebase-adminsdk or .env.local in git index" }

# 3. Pattern scan on tracked source (exclude node_modules)
$patterns = @(
  'AIzaSy[A-Za-z0-9_-]{20,}',
  'BEGIN PRIVATE KEY',
  '"private_key"\s*:'
)

$files = git ls-files 'src/**' '*.ts' '*.tsx' '*.js' 2>$null |
  Where-Object { $_ -notmatch 'node_modules|\.env\.example|route\.test' }

foreach ($pattern in $patterns) {
  $hits = @()
  foreach ($file in $files) {
    if (-not (Test-Path $file)) { continue }
    $match = Select-String -Path $file -Pattern $pattern -AllMatches -ErrorAction SilentlyContinue
    if ($match) { $hits += $match }
  }
  if ($hits.Count -gt 0) {
    Fail "Pattern '$pattern' in:`n$($hits | ForEach-Object { $_.Path + ':' + $_.LineNumber } | Select-Object -Unique | Out-String)"
  } else {
    Pass "No '$pattern' in tracked source"
  }
}

if ($fail) { exit 1 }
Write-Host "`nAll checks passed." -ForegroundColor Green
exit 0
