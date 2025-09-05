@echo off
echo Starting SKAI Project...
echo.

REM Check if PowerShell is available
powershell -Command "Get-Host" >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: PowerShell is required to run this script.
    echo Please ensure PowerShell is installed and available.
    pause
    exit /b 1
)

REM Check if we're running as administrator (optional, for Docker Desktop)
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo Note: Running without administrator privileges.
    echo Docker Desktop may require admin rights to start properly.
    echo.
)

REM Run the enhanced PowerShell script
echo Running enhanced startup script...
powershell -ExecutionPolicy Bypass -File "start-project.ps1"

REM Check if the script completed successfully
if %errorlevel% neq 0 (
    echo.
    echo Error: The startup script encountered an issue.
    echo Please check the output above for details.
    pause
    exit /b 1
)

echo.
echo Startup script completed successfully!
pause

