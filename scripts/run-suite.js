const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const newman = require('newman');

const root = path.resolve(__dirname, '..');
const reportsRoot = path.join(root, 'reports');
const allureCli = path.join(root, 'node_modules', 'allure-commandline', 'bin', 'allure');
const playwrightCli = path.join(root, 'node_modules', '@playwright', 'test', 'cli.js');
const collection = path.join(root, 'api-tests', 'Part-C-API-Automation.json');
const browsersPath = path.join(root, '.playwright-browsers');

const uiScenarios = {
  q1: ['tests/q1-invalid-login.spec.js'],
  q2: ['tests/q2-register-cart.spec.js'],
  q3: ['tests/q3-product-search-checkout.spec.js'],
};

function runProcess(command, args, env) {
  const result = spawnSync(command, args, { cwd: root, env, stdio: 'inherit', shell: false });
  if (result.error) throw result.error;
  return result.status ?? 1;
}

function generateAllure(resultsDir, reportDir) {
  fs.mkdirSync(reportDir, { recursive: true });
  return runProcess(process.execPath, [allureCli, 'generate', resultsDir, '--clean', '-o', reportDir], process.env);
}

function runUi(name, specFiles) {
  const runDir = path.join(reportsRoot, name);
  const resultsDir = path.join(runDir, 'allure-results');
  const htmlDir = path.join(runDir, 'playwright-html');
  fs.rmSync(runDir, { recursive: true, force: true });
  fs.mkdirSync(runDir, { recursive: true });
  fs.mkdirSync(resultsDir, { recursive: true });

  const env = {
    ...process.env,
    PLAYWRIGHT_BROWSERS_PATH: browsersPath,
    ALLURE_RESULTS_DIR: resultsDir,
    PLAYWRIGHT_HTML_OUTPUT_DIR: htmlDir,
  };
  const testStatus = runProcess(process.execPath, [playwrightCli, 'test', ...specFiles, '--project=chromium', '--workers=1'], env);
  const reportStatus = generateAllure(resultsDir, path.join(runDir, 'allure-report'));
  return testStatus || reportStatus;
}

function runApi() {
  const runDir = path.join(reportsRoot, 'api');
  const resultsDir = path.join(runDir, 'allure-results');
  const htmlPath = path.join(runDir, 'newman-html.html');
  fs.rmSync(runDir, { recursive: true, force: true });
  fs.mkdirSync(runDir, { recursive: true });
  fs.mkdirSync(resultsDir, { recursive: true });

  return new Promise((resolve) => {
    newman.run({
      collection,
      reporters: ['cli', 'htmlextra', 'allure'],
      reporter: {
        htmlextra: { export: htmlPath, title: 'Part C API Automation Report' },
        allure: { resultsDir },
      },
    }, (error, summary) => {
      const testStatus = error || summary?.run?.failures?.length ? 1 : 0;
      const reportStatus = generateAllure(resultsDir, path.join(runDir, 'allure-report'));
      resolve(testStatus || reportStatus);
    });
  });
}

async function main() {
  const target = process.argv[2];
  const knownTargets = ['q1', 'q2', 'q3', 'ui', 'api', 'all'];
  if (!knownTargets.includes(target)) {
    console.error(`Usage: node scripts/run-suite.js <${knownTargets.join('|')}>`);
    process.exitCode = 2;
    return;
  }

  const sequence = target === 'all' ? ['q1', 'q2', 'q3', 'api'] : target === 'ui' ? ['q1', 'q2', 'q3'] : [target];
  let finalStatus = 0;
  for (const item of sequence) {
    console.log(`\n=== Running ${item.toUpperCase()} ===`);
    const status = item === 'api' ? await runApi() : runUi(item, uiScenarios[item] || Object.values(uiScenarios).flat());
    if (status !== 0) finalStatus = status;
    console.log(`=== ${item.toUpperCase()} finished with exit code ${status}; reports: reports/${item}/ ===`);
  }
  process.exitCode = finalStatus;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
