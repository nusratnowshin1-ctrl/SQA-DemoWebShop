
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

## Q3 - Product Search and Checkout (E2E)

### Test Scenario
Verify the complete product search and checkout process using Playwright automation.

### Test Steps
1. Register a new customer.
2. Search for the product "Computing and Internet".
3. Verify that the correct product appears in search results.
4. Open the product details page.
5. Increase the product quantity to 3.
6. Add the product to the shopping cart.
7. Verify the product and quantity in the cart.
8. Agree to the Terms of Service.
9. Proceed to checkout.
10. Complete the billing, shipping and payment steps.
11. Confirm the order.
12. Open and verify the order details.

### Expected Result
The customer should successfully complete the checkout process, confirm the order, and view the order details.

### Test File
`tests/q3-product-search-checkout.spec.js`
