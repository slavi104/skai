# Start Project Script - Frontend and Backend
# This script starts both the frontend and backend services
# Enhanced version with automatic Docker Desktop startup

Write-Host "Starting SKAI Project..." -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan

# Step 1: Check and start Docker Desktop
Write-Host "Step 1: Checking Docker status..." -ForegroundColor Yellow
$dockerRunning = $false
$maxRetries = 30
$retryCount = 0

# Function to check if Docker is running
function Test-DockerRunning {
    try {
        docker version | Out-Null
        return $true
    } catch {
        return $false
    }
}

# Function to start Docker Desktop
function Start-DockerDesktop {
    Write-Host "Docker is not running. Attempting to start Docker Desktop..." -ForegroundColor Yellow
    
    # Try to start Docker Desktop using different methods
    $dockerPaths = @(
        "${env:ProgramFiles}\Docker\Docker\Docker Desktop.exe",
        "${env:ProgramFiles(x86)}\Docker\Docker\Docker Desktop.exe",
        "${env:LOCALAPPDATA}\Programs\Docker\Docker\Docker Desktop.exe"
    )
    
    $dockerStarted = $false
    foreach ($path in $dockerPaths) {
        if (Test-Path $path) {
            Write-Host "Starting Docker Desktop from: $path" -ForegroundColor Blue
            try {
                Start-Process -FilePath $path -WindowStyle Minimized
                $dockerStarted = $true
                break
            } catch {
                Write-Host "Failed to start Docker Desktop from: $path" -ForegroundColor Red
            }
        }
    }
    
    if (-not $dockerStarted) {
        Write-Host "Could not find Docker Desktop executable. Please start Docker Desktop manually." -ForegroundColor Red
        Write-Host "You can download it from: https://www.docker.com/products/docker-desktop/" -ForegroundColor Cyan
        exit 1
    }
    
    return $dockerStarted
}

# Check if Docker is already running
if (Test-DockerRunning) {
    Write-Host "Docker is already running" -ForegroundColor Green
    $dockerRunning = $true
} else {
    # Try to start Docker Desktop
    Start-DockerDesktop
    
    # Wait for Docker to start
    Write-Host "Waiting for Docker Desktop to start..." -ForegroundColor Blue
    while (-not $dockerRunning -and $retryCount -lt $maxRetries) {
        Start-Sleep -Seconds 2
        $retryCount++
        
        if (Test-DockerRunning) {
            $dockerRunning = $true
            Write-Host "Docker Desktop started successfully!" -ForegroundColor Green
        } else {
            Write-Host "Waiting for Docker... (Attempt $retryCount/$maxRetries)" -ForegroundColor Yellow
        }
    }
    
    if (-not $dockerRunning) {
        Write-Host "Docker Desktop failed to start within the expected time." -ForegroundColor Red
        Write-Host "Please start Docker Desktop manually and run this script again." -ForegroundColor Yellow
        exit 1
    }
}

# Step 2: Install dependencies if needed
Write-Host "Step 2: Installing/Checking dependencies..." -ForegroundColor Yellow
if (!(Test-Path "node_modules")) {
    Write-Host "Installing Node.js dependencies..." -ForegroundColor Blue
    pnpm install
} else {
    Write-Host "Node.js dependencies already installed" -ForegroundColor Green
}

# Step 3: Start database and Redis services
Write-Host "Step 3: Starting database and Redis services..." -ForegroundColor Yellow
Write-Host "Starting PostgreSQL and Redis containers..." -ForegroundColor Blue
docker-compose up db redis -d

# Wait for database to be ready
Write-Host "Waiting for database to be ready..." -ForegroundColor Blue
Start-Sleep -Seconds 10

# Step 4: Run database migrations
Write-Host "Step 4: Running database migrations..." -ForegroundColor Yellow
Write-Host "Applying Django migrations..." -ForegroundColor Blue

# First, check if there are any pending model changes that need migrations
Write-Host "Checking for pending model changes..." -ForegroundColor Blue
$migrationCheck = docker-compose exec backend python manage.py showmigrations --list 2>&1
$hasPendingChanges = $false

# Check if there are any apps with pending changes
$makemigrationsOutput = docker-compose exec backend python manage.py makemigrations --dry-run 2>&1
if ($makemigrationsOutput -match "No changes detected") {
    Write-Host "No pending model changes detected" -ForegroundColor Green
} else {
    Write-Host "Pending model changes detected. Creating new migrations..." -ForegroundColor Yellow
    $hasPendingChanges = $true
    
    # Create migrations for all apps
    Write-Host "Creating migrations for all apps..." -ForegroundColor Blue
    docker-compose exec backend python manage.py makemigrations
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Migrations created successfully" -ForegroundColor Green
    } else {
        Write-Host "Warning: Some issues occurred while creating migrations" -ForegroundColor Yellow
    }
}

# Apply migrations
Write-Host "Applying migrations..." -ForegroundColor Blue
$migrationOutput = docker-compose exec backend python manage.py migrate 2>&1

# Display migration results
Write-Host "Migration Results:" -ForegroundColor Cyan
$migrationOutput | ForEach-Object {
    if ($_ -match "No migrations to apply") {
        Write-Host "  [OK] $_" -ForegroundColor Green
    } elseif ($_ -match "Your models in app\(s\):.*have changes that are not yet reflected in a migration") {
        Write-Host "  [WARN] $_" -ForegroundColor Yellow
        Write-Host "  [INFO] This is normal if you just created migrations above" -ForegroundColor Gray
    } elseif ($_ -match "Run 'manage\.py makemigrations'") {
        Write-Host "  [INFO] $_" -ForegroundColor Gray
    } elseif ($_ -match "Operations to perform:") {
        Write-Host "  [INFO] $_" -ForegroundColor Blue
    } elseif ($_ -match "Running migrations:") {
        Write-Host "  [INFO] $_" -ForegroundColor Blue
    } elseif ($_ -match "  \d+ \w+") {
        Write-Host "  [OK] $_" -ForegroundColor Green
    } else {
        Write-Host "  $_" -ForegroundColor White
    }
}

# Step 5: Start backend services
Write-Host "Step 5: Starting backend services..." -ForegroundColor Yellow
Write-Host "Starting Django backend..." -ForegroundColor Blue
docker-compose up backend -d

# Wait for backend to be ready
Write-Host "Waiting for backend to be ready..." -ForegroundColor Blue
Start-Sleep -Seconds 15

# Step 6: Start frontend
Write-Host "Step 6: Starting frontend..." -ForegroundColor Yellow
Write-Host "Starting React/Vite development server..." -ForegroundColor Blue

# Start frontend in background
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; pnpm nx run webapp:start:app" -WindowStyle Minimized

# Wait for frontend to be ready
Write-Host "Waiting for frontend to be ready..." -ForegroundColor Blue
Start-Sleep -Seconds 20

# Step 7: Verify all services are running
Write-Host "Step 7: Verifying all services..." -ForegroundColor Yellow

# Check backend
try {
    $backendResponse = Invoke-WebRequest -Uri "http://localhost:5001/swagger.json" -UseBasicParsing -TimeoutSec 10
    Write-Host "Backend is running on http://localhost:5001" -ForegroundColor Green
} catch {
    Write-Host "Backend is not responding on http://localhost:5001" -ForegroundColor Red
}

# Check frontend
try {
    $frontendResponse = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 10
    Write-Host "Frontend is running on http://localhost:3000" -ForegroundColor Green
} catch {
    Write-Host "Frontend is not responding on http://localhost:3000" -ForegroundColor Red
}

# Check database
try {
    docker-compose exec db pg_isready -U backend | Out-Null
    Write-Host "PostgreSQL database is running" -ForegroundColor Green
} catch {
    Write-Host "PostgreSQL database is not responding" -ForegroundColor Red
}

# Check Redis
try {
    docker-compose exec redis redis-cli ping | Out-Null
    Write-Host "Redis is running" -ForegroundColor Green
} catch {
    Write-Host "Redis is not responding" -ForegroundColor Red
}

# Step 8: Display final status and URLs
Write-Host ""
Write-Host "Project Startup Complete!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Frontend Application:" -ForegroundColor White
Write-Host "   URL: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend API:" -ForegroundColor White
Write-Host "   URL: http://localhost:5001" -ForegroundColor Cyan
Write-Host "   API Docs: http://localhost:5001/doc/" -ForegroundColor Cyan
Write-Host "   ReDoc: http://localhost:5001/redoc/" -ForegroundColor Cyan
Write-Host ""
Write-Host "Database Services:" -ForegroundColor White
Write-Host "   PostgreSQL: localhost:5432" -ForegroundColor Cyan
Write-Host "   Redis: localhost:6379" -ForegroundColor Cyan
Write-Host ""
Write-Host "Additional Services:" -ForegroundColor White
Write-Host "   Mailcatcher: http://localhost:1080" -ForegroundColor Cyan
Write-Host "   Stripe Mock: http://localhost:12111" -ForegroundColor Cyan
Write-Host ""
Write-Host "Tips:" -ForegroundColor Yellow
Write-Host "   - Frontend runs in a separate PowerShell window" -ForegroundColor Gray
Write-Host "   - Use 'docker-compose logs -f backend' to view backend logs" -ForegroundColor Gray
Write-Host "   - Use 'docker-compose down' to stop all services" -ForegroundColor Gray
Write-Host "   - Use 'stop-project.ps1' to stop all services" -ForegroundColor Gray
Write-Host ""
Write-Host "Press Enter to continue..." -ForegroundColor Gray
Read-Host 
