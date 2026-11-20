# Part C API Automation

The Postman collection in this folder is run with Newman from the repository root:

```bash
npm ci
npm run test:api
```

The collection uses public JSONPlaceholder endpoints and does not require credentials. Newman creates the HTML report and Allure results; the runner then generates the Allure HTML report. See the [main README](../README.md) for the full setup and combined UI/API commands.
