# Stop Project Script - Frontend and Backend
# This script stops all project services
# Enhanced version with better Docker handling

Write-Host "🛑 Stopping SKAI Project..." -ForegroundColor Red
Write-Host "==========================================" -ForegroundColor Cyan

# Function to check if Docker is running
function Test-DockerRunning {
    try {
        docker version | Out-Null
        return $true
    } catch {
        return $false
    }
}

# Step 1: Check Docker status and stop containers
Write-Host "📋 Step 1: Stopping Docker containers..." -ForegroundColor Yellow

if (Test-DockerRunning) {
    Write-Host "Docker is running. Stopping all project containers..." -ForegroundColor Blue
    try {
        docker-compose down
        Write-Host "✅ Docker containers stopped successfully" -ForegroundColor Green
    } catch {
        Write-Host "⚠️ Warning: Some Docker containers may still be running" -ForegroundColor Yellow
    }
} else {
    Write-Host "⚠️ Docker is not running. Skipping container cleanup." -ForegroundColor Yellow
}

# Step 2: Kill any remaining Node.js processes (frontend)
Write-Host "🎨 Step 2: Stopping frontend processes..." -ForegroundColor Yellow
Write-Host "Killing Node.js processes..." -ForegroundColor Blue

try {
    $nodeProcesses = Get-Process | Where-Object {$_.ProcessName -like "*node*" -and $_.MainWindowTitle -like "*vite*"}
    if ($nodeProcesses) {
        $nodeProcesses | Stop-Process -Force -ErrorAction SilentlyContinue
        Write-Host "✅ Frontend processes terminated" -ForegroundColor Green
    } else {
        Write-Host "✅ No frontend processes found" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠️ Warning: Could not terminate all frontend processes" -ForegroundColor Yellow
}

# Step 3: Check if any services are still running
Write-Host "🔍 Step 3: Checking for remaining services..." -ForegroundColor Yellow

# Check if backend is still running
try {
    $backendResponse = Invoke-WebRequest -Uri "http://localhost:5001/swagger.json" -UseBasicParsing -TimeoutSec 5
    Write-Host "⚠️ Backend is still running on http://localhost:5001" -ForegroundColor Yellow
} catch {
    Write-Host "✅ Backend has been stopped" -ForegroundColor Green
}

# Check if frontend is still running
try {
    $frontendResponse = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 5
    Write-Host "⚠️ Frontend is still running on http://localhost:3000" -ForegroundColor Yellow
} catch {
    Write-Host "✅ Frontend has been stopped" -ForegroundColor Green
}

# Check if database is still running (only if Docker is running)
if (Test-DockerRunning) {
    try {
        docker-compose exec db pg_isready -U backend | Out-Null
        Write-Host "⚠️ PostgreSQL database is still running" -ForegroundColor Yellow
    } catch {
        Write-Host "✅ PostgreSQL database has been stopped" -ForegroundColor Green
    }

    # Check if Redis is still running
    try {
        docker-compose exec redis redis-cli ping | Out-Null
        Write-Host "⚠️ Redis is still running" -ForegroundColor Yellow
    } catch {
        Write-Host "✅ Redis has been stopped" -ForegroundColor Green
    }
} else {
    Write-Host "⚠️ Docker not running - cannot check database services" -ForegroundColor Yellow
}

# Step 4: Optional Docker Desktop shutdown
Write-Host "🐳 Step 4: Docker Desktop management..." -ForegroundColor Yellow
Write-Host "Do you want to stop Docker Desktop as well? (y/N): " -ForegroundColor Cyan -NoNewline
$response = Read-Host

if ($response -eq "y" -or $response -eq "Y") {
    if (Test-DockerRunning) {
        Write-Host "Stopping Docker Desktop..." -ForegroundColor Blue
        try {
            # Try to stop Docker Desktop gracefully
            $dockerProcess = Get-Process | Where-Object {$_.ProcessName -like "*Docker*"}
            if ($dockerProcess) {
                $dockerProcess | Stop-Process -Force -ErrorAction SilentlyContinue
                Write-Host "✅ Docker Desktop stopped" -ForegroundColor Green
            }
        } catch {
            Write-Host "⚠️ Could not stop Docker Desktop automatically" -ForegroundColor Yellow
            Write-Host "   Please stop Docker Desktop manually from the system tray" -ForegroundColor Gray
        }
    } else {
        Write-Host "✅ Docker Desktop is already stopped" -ForegroundColor Green
    }
} else {
    Write-Host "✅ Docker Desktop will continue running" -ForegroundColor Green
}

# Step 5: Display final status
Write-Host ""
Write-Host "🛑 Project Shutdown Complete!" -ForegroundColor Red
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 Tips:" -ForegroundColor Yellow
Write-Host "   - All Docker containers have been stopped" -ForegroundColor Gray
Write-Host "   - Frontend processes have been terminated" -ForegroundColor Gray
Write-Host "   - Use 'start-project.ps1' to start the project again" -ForegroundColor Gray
Write-Host "   - Docker Desktop can be managed from the system tray" -ForegroundColor Gray
Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

