# SKAI Project Scripts

This directory contains enhanced scripts to start and stop the SKAI project with automatic Docker Desktop management.

## Available Scripts

### Start Scripts

- `start-project.bat` - Windows batch file to start the project
- `start-project.ps1` - PowerShell script with enhanced Docker Desktop management

### Stop Scripts

- `stop-project.bat` - Windows batch file to stop the project
- `stop-project.ps1` - PowerShell script with enhanced Docker Desktop management

## Enhanced Features

### 🐳 Automatic Docker Desktop Management

- **Auto-start**: The start script automatically detects if Docker Desktop is running
- **Smart startup**: If Docker is not running, it attempts to start Docker Desktop from common installation paths
- **Wait mechanism**: Waits up to 60 seconds for Docker to fully initialize
- **Fallback**: Provides helpful error messages if Docker Desktop cannot be started automatically

### 🛑 Graceful Shutdown

- **Container cleanup**: Stops all Docker containers properly
- **Process termination**: Kills any remaining Node.js frontend processes
- **Service verification**: Checks if services are properly stopped
- **Optional Docker shutdown**: Offers to stop Docker Desktop after project shutdown

### 🔧 Better Error Handling

- **Docker status checking**: Verifies Docker availability before operations
- **Graceful failures**: Continues with available services even if some fail
- **User feedback**: Clear status messages and progress indicators
- **Helpful tips**: Provides guidance for manual intervention when needed

## Usage

### Starting the Project

```powershell
# Option 1: Use the batch file (recommended for Windows)
.\start-project.bat

# Option 2: Use the PowerShell script directly
.\start-project.ps1
```

### Stopping the Project

```powershell
# Option 1: Use the batch file (recommended for Windows)
.\stop-project.bat

# Option 2: Use the PowerShell script directly
.\stop-project.ps1
```

## What the Scripts Do

### Start Script (`start-project.ps1`)

1. **Check Docker status** - Verifies if Docker Desktop is running
2. **Auto-start Docker** - If not running, attempts to start Docker Desktop
3. **Install dependencies** - Runs `pnpm install` if needed
4. **Start database services** - Launches PostgreSQL and Redis containers
5. **Run migrations** - Applies Django database migrations
6. **Start backend** - Launches the Django backend service
7. **Start frontend** - Opens a new PowerShell window for the React/Vite dev server
8. **Verify services** - Checks that all services are responding
9. **Display URLs** - Shows access URLs for all services

### Stop Script (`stop-project.ps1`)

1. **Stop containers** - Runs `docker-compose down` to stop all containers
2. **Kill processes** - Terminates any remaining Node.js frontend processes
3. **Verify shutdown** - Checks that services are properly stopped
4. **Optional Docker shutdown** - Offers to stop Docker Desktop
5. **Display status** - Shows final shutdown status

## Requirements

- **Windows 10/11** with PowerShell 5.1 or later
- **Docker Desktop** installed (the script will help you install it if missing)
- **Node.js** and **pnpm** for frontend development
- **Python** and **pip** for backend development

## Troubleshooting

### Docker Desktop Issues

- If Docker Desktop fails to start automatically, start it manually from the Start menu
- Ensure Docker Desktop has the necessary permissions
- Check that virtualization is enabled in BIOS (for WSL2 backend)

### Permission Issues

- Run PowerShell as Administrator if you encounter permission errors
- Ensure your user account has the necessary permissions for Docker

### Service Issues

- Check Docker Desktop logs if containers fail to start
- Verify that ports 3000, 5001, 5432, and 6379 are not in use by other applications
- Use `docker-compose logs -f [service]` to view service logs

## Manual Commands

If you prefer to run commands manually:

```powershell
# Start services
docker-compose up -d db redis
docker-compose up -d backend
pnpm nx run webapp:start:app

# Stop services
docker-compose down
Get-Process | Where-Object {$_.ProcessName -like "*node*"} | Stop-Process -Force
```

## Support

For issues with the scripts:

1. Check the error messages in the terminal output
2. Verify that all requirements are met
3. Try running the PowerShell scripts directly for more detailed error information
4. Check the Docker Desktop logs for container-related issues
