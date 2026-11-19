
const { test, expect } = require('@playwright/test');

const { RegisterPage } = require('../pages/RegisterPage');
const { LoginPage } = require('../pages/LoginPage');

test('Q2 - Register and add product to cart', async ({ page }, testInfo) => {

    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);

    const email = `q2user${Date.now()}@gmail.com`;
    const password = 'TestPass123!';

    // Open Registration Page
    await page.goto('https://demowebshop.tricentis.com/register');

    // Register New Customer
    await registerPage.register(
        'Test',
        'Customer',
        email,
        password
    );

    // Verify Registration
    await expect(page.locator('.result'))
        .toContainText('Your registration completed');

    // Logout if registration automatically logs in
    const logoutLink = page.locator('.ico-logout');

    if (await logoutLink.isVisible()) {
        await logoutLink.click();
    }

    // Open Login Page
    await page.goto('https://demowebshop.tricentis.com/login');

    // Login with registered account
    await loginPage.login(email, password);

    // Verify successful login
    await expect(
        page.getByRole('link', {
            name: email,
            exact: true
        })
    ).toBeVisible();

    // Navigate to Books Category
    await page.goto('https://demowebshop.tricentis.com/books');

    // Select Product
    await page.getByRole('link', {
        name: 'Computing and Internet',
        exact: true
    }).click();

    // Verify Product Page
    await expect(
        page.getByRole('heading', {
            name: 'Computing and Internet'
        })
    ).toBeVisible();

    // Set Product Quantity
    await page.locator('.qty-input').fill('2');

    // Add Product to Cart
    await page.locator('#add-to-cart-button-13').click();

    // Open Shopping Cart
    await page.getByRole('link', {
        name: /Shopping cart/
    }).first().click();

    // Verify Product in Cart
    const cartItem = page.locator('.cart-item-row')
        .filter({ hasText: 'Computing and Internet' });

    await expect(cartItem).toBeVisible();

    // Verify Quantity
    await expect(
        cartItem.locator('.qty-input')
    ).toHaveValue('2');

    // Capture Full Page Screenshot
    const screenshot = await page.screenshot({
        fullPage: true
    });

    // Attach Screenshot to Allure Report
    await testInfo.attach('Q2 Cart Screenshot', {
        body: screenshot,
        contentType: 'image/png'
    });

});
