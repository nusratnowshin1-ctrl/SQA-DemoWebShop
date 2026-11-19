class LoginPage {

constructor(page) {

this.page = page;

this.emailInput = page.locator('#Email');

this.passwordInput = page.locator('#Password');

this.loginButton = page.locator('.login-button');

this.errorMessage = page.locator('.validation-summary-errors') ;

this.loginLink = page.locator('.ico-login');

}

async login(email, password) {

await this.emailInput.fill(email);

await this.passwordInput.fill(password);

await this.loginButton.click();

}

}

module.exports = { LoginPage };