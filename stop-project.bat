@echo off
echo Stopping SKAI Project...
echo.

REM Check if PowerShell is available
powershell -Command "Get-Host" >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: PowerShell is required to run this script.
    echo Please ensure PowerShell is installed and available.
    pause
    exit /b 1
)

REM Run the enhanced PowerShell script
echo Running enhanced shutdown script...
powershell -ExecutionPolicy Bypass -File "stop-project.ps1"

REM Check if the script completed successfully
if %errorlevel% neq 0 (
    echo.
    echo Warning: The shutdown script encountered an issue.
    echo Please check the output above for details.
    pause
    exit /b 1
)

echo.
echo Shutdown script completed successfully!
pause

