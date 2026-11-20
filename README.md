# SQA Demo Web Shop Automation

Playwright UI scenarios for Part A and a Newman/Postman API collection for Part C. Each run writes an HTML report and an Allure report under `reports/`.

## Requirements

- Node.js 20 or newer and npm
- Git (only needed to clone the repository)
- Internet access while running UI/API scenarios

## Setup

```bash
git clone https://github.com/nusratnowshin1-ctrl/SQA-DemoWebShop.git
cd SQA-DemoWebShop
npm ci
npm run setup:browsers
```

The suite runs Playwright in Chromium in headless mode by default. Use `npx playwright install --with-deps chromium` on Linux if browser system dependencies are missing.

## Run an individual UI scenario

```bash
npm run test:q1
npm run test:q2
npm run test:q3
```

Each command runs its scenario in `tests/` and generates reports under `reports/q1/`, `reports/q2/`, or `reports/q3/`.

## Run the UI suite

```bash
npm run test:ui
```

This runs Q1, Q2, and Q3 sequentially. Each scenario gets its own HTML and Allure report folder.

## Run the Part C API collection

The Postman collection is included in [`api-tests/Part-C-API-Automation.json`](api-tests/Part-C-API-Automation.json). Run it with Newman:

```bash
npm run test:api
```

The API HTML report is `reports/api/newman-html.html`; the Allure report is `reports/api/allure-report/index.html`.

## Run everything in sequence

```bash
npm run test:all
```

This runs Q1, Q2, Q3, and then the Part C API collection. Execution continues through the sequence if a scenario fails, and the command returns a failing exit code if any scenario fails.

## View reports

Open the generated HTML files directly in a browser:

- UI: `reports/<scenario>/playwright-html/index.html`
- API: `reports/api/newman-html.html`
- Allure: `reports/<scenario>/allure-report/index.html`

An Allure report is generated after every run and includes test details and captured attachments. Reports are regenerated for a scenario the next time that scenario is run. Generated reports are ignored by Git; run the tests after cloning to create them locally.

## Project structure

```text
pages/                  Playwright page objects
tests/                  Part A UI scenarios
api-tests/              Part C Postman collection and notes
scripts/run-suite.js    Individual and sequential suite runner
playwright.config.js    Playwright and report configuration
reports/                Generated HTML and Allure reports (local)
```

## Public repository

https://github.com/nusratnowshin1-ctrl/SQA-DemoWebShop
