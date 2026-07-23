# ============================================================================
# Convenience launcher (Windows PowerShell).
# Loads backend/.env into the process environment, then starts the Spring Boot app.
# The built frontend is already served by the backend at http://localhost:8080.
#   Usage:  ./run.ps1
# ============================================================================
$ErrorActionPreference = "Stop"
$envFile = Join-Path $PSScriptRoot "backend/.env"

if (-not (Test-Path $envFile)) {
    Write-Error "backend/.env not found. Copy backend/.env.example to backend/.env and fill it in."
    exit 1
}

Get-Content $envFile | ForEach-Object {
    $line = $_.Trim()
    if ($line -and -not $line.StartsWith("#") -and $line.Contains("=")) {
        $idx = $line.IndexOf("=")
        $name = $line.Substring(0, $idx).Trim()
        $value = $line.Substring($idx + 1).Trim()
        [Environment]::SetEnvironmentVariable($name, $value, "Process")
        Write-Host "loaded $name"
    }
}

# Bridge the Supabase template variables to the Spring Boot datasource keys.
if ([Environment]::GetEnvironmentVariable("SUPABASE_DB_URL", "Process")) {
    [Environment]::SetEnvironmentVariable("SPRING_DATASOURCE_URL",
        [Environment]::GetEnvironmentVariable("SUPABASE_DB_URL", "Process"), "Process")
    [Environment]::SetEnvironmentVariable("SPRING_DATASOURCE_USERNAME",
        [Environment]::GetEnvironmentVariable("SUPABASE_DB_USERNAME", "Process"), "Process")
    [Environment]::SetEnvironmentVariable("SPRING_DATASOURCE_PASSWORD",
        [Environment]::GetEnvironmentVariable("SUPABASE_DB_PASSWORD", "Process"), "Process")
    [Environment]::SetEnvironmentVariable("SPRING_DATASOURCE_DRIVER_CLASS_NAME", "org.postgresql.Driver", "Process")
    [Environment]::SetEnvironmentVariable("SPRING_JPA_HIBERNATE_DDL_AUTO", "update", "Process")
    Write-Host "mapped SUPABASE_DB_* to SPRING_DATASOURCE_*"
}

Set-Location (Join-Path $PSScriptRoot "backend")
mvn spring-boot:run
