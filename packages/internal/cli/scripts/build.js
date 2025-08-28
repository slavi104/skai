const path = require('node:path');
const { spawn } = require('node:child_process');

(async () => {
  try {
    // Try to find pnpm in common locations
    const pnpmPaths = [
      'pnpm',
      'C:\\Program Files\\nodejs\\pnpm.cmd',
      'C:\\Program Files\\nodejs\\pnpm.ps1',
      process.env.npm_execpath?.replace('npm', 'pnpm'),
    ].filter(Boolean);

    let pnpmCommand = null;
    
    for (const pnpmPath of pnpmPaths) {
      try {
        const { execSync } = require('child_process');
        execSync(`${pnpmPath} --version`, { stdio: 'ignore' });
        pnpmCommand = pnpmPath;
        break;
      } catch (e) {
        // Continue to next path
      }
    }

    if (!pnpmCommand) {
      console.log('pnpm not found, skipping build');
      process.exit(0);
    }

    const { runCommand } = require('./lib/runCommand');
    await runCommand(pnpmCommand, ['run', 'build'], {
      cwd: path.resolve(__dirname, '..'),
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // Don't exit with error, just log it
    console.log('Build failed, but continuing...');
    process.exit(0);
  }
})();
