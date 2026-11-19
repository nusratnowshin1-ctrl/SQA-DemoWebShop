# SQA Demo Web Shop Automation

## 1. Project Overview

This project contains automated test scenarios for the Demo Web Shop application using Playwright with JavaScript.

The project focuses on testing login validation, customer registration, product search, shopping cart functionality, and the complete checkout process.

## 2. Technology Stack

- JavaScript (Node.js)
- Playwright Test
- Chromium Browser
- Allure Report
- Page Object Model (POM)
- Git and GitHub

## 3. Project Structure

```text
SQA-DemoWebShop/
│
├── pages/
│   ├── LoginPage.js
│   ├── RegisterPage.js
│   └── SearchPage.js
│
├── tests/
│   ├── q1-invalid-login.spec.js
│   ├── q2-register-cart.spec.js
│   └── q3-product-search-checkout.spec.js
│
├── playwright.config.js
├── package.json
├── package-lock.json
└── README.md
```

## 4. Test Scenarios

### Q1 - Invalid Login

**Objective:** Verify that the application displays an error message when a user enters invalid login credentials.

**Expected Result:** Login should fail and an appropriate error message should be displayed.

**Test File:** `tests/q1-invalid-login.spec.js`

### Q2 - Register and Add Product to Cart

**Objective:** Register a new customer and verify that a selected product can be added to the shopping cart.

**Test Steps:**
1. Open the Demo Web Shop.
2. Register a new customer.
3. Verify successful registration.
4. Search and open a product.
5. Add the product to the shopping cart.
6. Verify the product in the cart.

**Expected Result:** The customer should be registered successfully, and the selected product should appear in the shopping cart.

**Test File:** `tests/q2-register-cart.spec.js`

### Q3 - Product Search and Checkout (E2E)

**Objective:** Test the complete product purchasing workflow.

**Test Steps:**
1. Search for a product.
2. Verify the correct search result.
3. Open the product details.
4. Increase the product quantity.
5. Add the product to the shopping cart.
6. Verify the product and quantity.
7. Agree to the Terms of Service.
8. Proceed to checkout.
9. Complete billing, shipping and payment steps.
10. Confirm the order.
11. Open and verify the order details.

**Expected Result:** The customer should successfully complete the checkout process, confirm the order, and view the order details.

**Test File:** `tests/q3-product-search-checkout.spec.js`

## 5. Installation and Setup

### Prerequisites

- Node.js
- npm
- Git

### Clone the Repository

```bash
git clone https://github.com/nusratnowshin1-ctrl/SQA-DemoWebShop.git
cd SQA-DemoWebShop
```

### Install Dependencies

```bash
npm install
```

### Install Chromium

```bash
npx playwright install chromium
```

## 6. Running Individual Test Scenarios

### Run Q1

```bash
npx playwright test tests/q1-invalid-login.spec.js --project=chromium --headed --workers=1 --reporter=list
```

### Run Q2

```bash
npx playwright test tests/q2-register-cart.spec.js --project=chromium --headed --workers=1 --reporter=list
```

### Run Q3

```bash
npx playwright test tests/q3-product-search-checkout.spec.js --project=chromium --headed --workers=1 --reporter=list
```

## 7. Run All Test Scenarios Together

```bash
npx playwright test --project=chromium --headed --workers=1 --reporter=list
```

## 8. Allure Report Generation

After executing the tests with the configured Allure reporter, generate the report using:

```bash
allure generate allure-results --clean -o allure-report
```

Open the generated report:

```bash
allure open allure-report
```

The Allure Report provides an overview of test execution, passed and failed test cases, and detailed test execution information.

## 9. GitHub Workflow

The project uses separate branches for individual test scenarios.

- `main`
- `q1-invalid-login`
- `q2-register-cart`
- `q3-product-checkout`

Each question was developed and documented in its respective branch and merged into the main branch.

Meaningful commits were maintained to reflect incremental project development.

## 10. Test Execution Summary

The project contains three automated test scenarios:

1. Q1 - Invalid Login
2. Q2 - Register and Add Product to Cart
3. Q3 - Product Search and Checkout (E2E)

All three test scenarios successfully passed during the recorded test execution.

---

**Project:** SQA Demo Web Shop Automation  
**Repository:** https://github.com/nusratnowshin1-ctrl/SQA-DemoWebShop  
**Automation Framework:** Playwright with JavaScript