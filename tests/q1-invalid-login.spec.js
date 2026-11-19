
const { test, expect } = require('@playwright/test');

const { LoginPage } = require('../pages/LoginPage');

test('Q1. Invalid login should show error message', async ({ page }, testInfo) => {

    const loginPage = new LoginPage(page);

    await page.goto('https://demowebshop.tricentis.com/login');

    await loginPage.login(
        'wrongtest123@gmail.com',
        'WrongPassword123'
    );

    await expect(loginPage.errorMessage).toContainText(
        'Login was unsuccessful. Please correct the errors and try again.'
    );

    await expect(loginPage.loginLink).toBeVisible();

    // Capture full-page screenshot
    const screenshot = await page.screenshot({
        fullPage: true
    });

    // Attach screenshot to test report
    await testInfo.attach('Q1 Invalid Login Screenshot', {
        body: screenshot,
        contentType: 'image/png'
    });

});
