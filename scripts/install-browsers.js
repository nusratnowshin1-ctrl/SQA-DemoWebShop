const { spawnSync } = require('node:child_process');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const playwrightCli = path.join(root, 'node_modules', '@playwright', 'test', 'cli.js');
const env = { ...process.env, PLAYWRIGHT_BROWSERS_PATH: path.join(root, '.playwright-browsers') };
const result = spawnSync(process.execPath, [playwrightCli, 'install', 'chromium', '--only-shell'], {
  cwd: root,
  env,
  stdio: 'inherit',
});

if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
