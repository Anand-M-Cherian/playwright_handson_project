class LoginPage {
    constructor(page, expect) {
        this.page = page;
        this.expect = expect;
        this.emailTextBox = page.getByPlaceholder('Email');
        this.passwordTextBox = page.getByPlaceholder('Passsword');
        this.loginBtn = page.locator('#login');
    }

    async openPage() {
        await this.page.goto('https://rahulshettyacademy.com/client/');
    }

    async login(emailId, password) {
        await this.emailTextBox.fill(emailId);
        await this.passwordTextBox.fill(password);
        await this.loginBtn.click();
    }
}

module.exports = {LoginPage};