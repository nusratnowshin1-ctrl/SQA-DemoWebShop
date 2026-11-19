
class RegisterPage {

    constructor(page) {

        this.page = page;

        this.firstNameInput = page.locator('#FirstName');
        this.lastNameInput = page.locator('#LastName');
        this.emailInput = page.locator('#Email');
        this.passwordInput = page.locator('#Password');
        this.confirmPasswordInput = page.locator('#ConfirmPassword');

        this.femaleGender = page.locator('#gender-female');
        this.registerButton = page.locator('#register-button');

    }

    async register(firstName, lastName, email, password) {

        await this.femaleGender.check();

        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(password);

        await this.registerButton.click();

    }

}

module.exports = { RegisterPage };
