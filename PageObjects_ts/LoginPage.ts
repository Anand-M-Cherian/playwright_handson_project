import { type Expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
    page: Page;
    expect: Expect;
    emailTextBox: Locator;
    passwordTextBox:Locator;
    loginBtn: Locator;

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

    async login(emailId: string, password: string) {
        await this.emailTextBox.fill(emailId);
        await this.passwordTextBox.fill(password);
        await this.loginBtn.click();
    }
}