# Push Sitecore vars from .env.local to Vercel (production, preview, development).
# Usage: vercel login && vercel link  then  .\scripts\set-sitecore-vercel-env.ps1

$ErrorActionPreference = 'Stop'
$root = Split-Path $PSScriptRoot -Parent
$envFile = Join-Path $root '.env.local'
if (-not (Test-Path $envFile)) { throw ".env.local not found at $envFile" }

$names = @(
  'XMC_HOST',
  'SITECORE_CLIENT_ID',
  'SITECORE_CLIENT_SECRET',
  'SITECORE_SITE_PATH',
  'SITECORE_ATTENDEES_PARENT_PATH',
  'SITECORE_ATTENDEE_TEMPLATE_ID',
  'SITECORE_ATTENDEE_SYNC',
  'NEXT_PUBLIC_ENABLE_SITECORE_ATTENDEE_PAGES'
)

$vars = @{}
Get-Content $envFile | ForEach-Object {
  if ($_ -match '^\s*#' -or $_ -notmatch '=') { return }
  $parts = $_ -split '=', 2
  $key = $parts[0].Trim()
  if ($names -contains $key) {
    $vars[$key] = $parts[1].Trim().Trim('"')
  }
}

$targets = @('production', 'preview', 'development')
foreach ($name in $vars.Keys) {
  foreach ($target in $targets) {
    Write-Host "Setting $name ($target)..."
    $vars[$name] | vercel env add $name $target --force
  }
}

Write-Host 'Done. Redeploy production for changes to apply.'
