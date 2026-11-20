
const { test, expect } = require('@playwright/test');

const { RegisterPage } = require('../pages/RegisterPage');
const { SearchPage } = require('../pages/SearchPage');

test('Q3 - Product Search and Checkout', async ({ page }) => {
    test.setTimeout(60000);

    const searchPage = new SearchPage(page);
    const registerPage = new RegisterPage(page);

    const email = `q3user${Date.now()}@gmail.com`;
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

    await expect(page.locator('.ico-logout')).toBeVisible();

    // Open Home Page
    await page.goto('https://demowebshop.tricentis.com/');

    // Search Product
    await searchPage.searchProduct('Computing and Internet');

    // Verify Search Result
    await expect(
        page.getByRole('link', {
            name: 'Computing and Internet',
            exact: true
        })
    ).toBeVisible();

    // Open Product
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

    // Increase Quantity
    await page.locator('.qty-input').fill('3');

    // Add Product to Cart
    await page.locator('#add-to-cart-button-13').click();

    // Wait for Product Added Notification
    await expect(page.locator('.bar-notification.success'))
        .toContainText(/added to.*shopping cart/i);

    
    // Verify Product Added Notification
    await expect(page.locator('.bar-notification.success'))
        .toContainText(/added to.*shopping cart/i);

    // Verify Cart Quantity Updated
    await expect(page.locator('.ico-cart .cart-qty'))
        .toContainText('(3)');

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
    ).toHaveValue('3');


    // Take Cart Screenshot
    await page.screenshot({
        path: 'q3-cart.png',
        fullPage: true
    });

    // Agree to Terms of Service
    await page.locator('#termsofservice').check();

    // Click Checkout
    await page.locator('#checkout').click();

    // Verify Billing Address
    await expect(
        page.locator('#BillingNewAddress_CountryId')
    ).toBeVisible();

    // Select Country
    await page.locator('#BillingNewAddress_CountryId')
        .selectOption({ label: 'Bangladesh' });

    // Fill Billing Address
    await page.locator('#BillingNewAddress_City').fill('Dhaka');

    await page.locator('#BillingNewAddress_Address1')
        .fill('Agargaon');

    await page.locator('#BillingNewAddress_ZipPostalCode')
        .fill('1207');

    await page.locator('#BillingNewAddress_PhoneNumber')
        .fill('01700000000');

    // Billing Address Screenshot
    await page.screenshot({
        path: 'q3-billing-address.png',
        fullPage: true
    });

    // Continue Billing Address
    await page.locator(
        '#billing-buttons-container .new-address-next-step-button'
    ).click();

    await expect(
        page.locator('#shipping-buttons-container .new-address-next-step-button')
    ).toBeVisible();

    // Continue Shipping Address
    await page.locator(
        '#shipping-buttons-container .new-address-next-step-button'
    ).click();

    // Shipping Method
    await expect(
        page.locator('#shipping-method-buttons-container')
    ).toBeVisible();

    await page.screenshot({
        path: 'q3-shipping-method.png',
        fullPage: true
    });

    await page.locator(
        '#shipping-method-buttons-container .shipping-method-next-step-button'
    ).click();

    // Payment Method
    await expect(
        page.locator('#payment-method-buttons-container')
    ).toBeVisible();

    // Select Cash On Delivery
    await page.locator('input[name="paymentmethod"]').first().check();

    await page.screenshot({
        path: 'q3-payment-method.png',
        fullPage: true
    });

    // Continue Payment Method
    await page.locator(
        '#payment-method-buttons-container .payment-method-next-step-button'
    ).click();

    // Payment Information
    await expect(
        page.locator('#payment-info-buttons-container')
    ).toBeVisible();

    await page.screenshot({
        path: 'q3-payment-information.png',
        fullPage: true
    });

    // Continue to Confirm Order
    await page.locator(
        '#payment-info-buttons-container .payment-info-next-step-button'
    ).click();

    // Verify Confirm Order
    await expect(
        page.locator('#confirm-order-buttons-container')
    ).toBeVisible();

    // Confirm Order Screenshot
    await page.screenshot({
        path: 'q3-confirm-order.png',
        fullPage: true
    });

    // Click Confirm Order
    await page.locator(
        '#confirm-order-buttons-container .confirm-order-next-step-button'
    ).click();

    // Verify Order Completed
    await expect(page.locator('.order-completed'))
        .toContainText(/successfully processed/i);

    // Order Confirmation Screenshot
    await page.screenshot({
        path: 'q3-order-confirmation.png',
        fullPage: true
    });

    // Open Order Details
    const orderDetailsLink = page.getByRole('link', {
        name: /order details/i
    });

    await expect(orderDetailsLink).toBeVisible();

    await orderDetailsLink.click();

    // Verify Order Details Page
    await expect(page.locator('.order-details-page'))
        .toBeVisible();

    // Final Order Details Screenshot
    await page.screenshot({
        path: 'q3-order-details.png',
        fullPage: true
    });

});
