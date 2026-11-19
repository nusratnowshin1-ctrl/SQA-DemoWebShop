
# SQA Demo Web Shop Automation

## Project Overview
This project contains automated testing scenarios for the Demo Web Shop website using Playwright and JavaScript.

## Tech Stack
- JavaScript
- Playwright Test
- Node.js
- Visual Studio Code

## Q1 - Invalid Login Test

### Test Scenario
Verify that the application displays an appropriate error message when a user attempts to log in with invalid credentials.

### Expected Result
The login should fail and an error message should be displayed.

### Test File
`tests/q1-invalid-login.spec.js`

## Q2 - Register and Add Product to Cart

### Test Scenario
Register a new customer account and verify that the user can successfully add a product to the shopping cart.

### Test Steps
1. Open the Demo Web Shop.
2. Register a new customer.
3. Verify successful registration.
4. Search and open a product.
5. Add the product to the shopping cart.
6. Verify that the product appears in the cart.

### Expected Result
The customer should be registered successfully, and the selected product should be added to the shopping cart.

### Test File
`tests/q2-register-cart.spec.js`
