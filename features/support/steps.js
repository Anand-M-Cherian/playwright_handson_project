const { Given, When, Then } = require('@cucumber/cucumber');
const {LoginPage} = require('../../PageObjects/LoginPage');
const {ProductsListingPage} = require('../../PageObjects/ProductsListingPage');
const {CartPage} = require('../../PageObjects/CartPage');
const {PaymentPage} = require('../../PageObjects/PaymentPage');
const {OrderConfirmationPage} = require('../../PageObjects/OrderConfirmationPage');
const {MyOrdersPage} = require('../../PageObjects/MyOrdersPage');
const {OrderSummaryPage} = require('../../PageObjects/OrderSummaryPage');
const { expect } = require('@playwright/test');


Given('user logs into the ecommerce application with {string} and {string}', async function (emailId, password) {
    const loginPage = new LoginPage(this.page, expect);
    await loginPage.openPage();
    await loginPage.login(emailId, password);
    await this.page.waitForLoadState('networkidle');
});

When('user adds {string} into the cart', async function (requriedProduct) {
    this.productsListingPage = new ProductsListingPage(this.page, expect);
    this.price = await this.productsListingPage.getProductPrice(requriedProduct);
    await this.productsListingPage.addProductToCart(requriedProduct);
});

Then('verify that {string} has been added into the cart', async function (requriedProduct) {
    await this.productsListingPage.goToCartPage();
    await this.page.waitForLoadState('networkidle');
    const cartPage = new CartPage(this.page, expect);
    await cartPage.validateProductPrice(requriedProduct, this.price);
    await cartPage.checkout();
    await this.page.waitForLoadState('networkidle');

});

When('user enters valid receiver details with {string}, {string}, {string}, {string}, {string} and places order', {timeout: 10 * 1000}, async function (country, cvv, nameOnCard, coupon, emailId) {
    const paymentPage = new PaymentPage(this.page, expect);
    await paymentPage.selectCountry(country);
    await paymentPage.validateSelectedCOuntry(country);
    await paymentPage.enterCVV(cvv);
    await paymentPage.enterNameOnCard(nameOnCard);
    await paymentPage.applyCoupon(coupon);
    await paymentPage.validateCouponApplied();
    await paymentPage.validateEmailId(emailId);
    await paymentPage.placeOrder();

});

Then('verify that order id is generated and present in the order history', async function () {
    const orderConfirmationPage = new OrderConfirmationPage(this.page, expect);
    await orderConfirmationPage.validateThankYouMessage();
    const orderId = await orderConfirmationPage.captureOrderId();
    await orderConfirmationPage.goToMyOrders();
    const myOrdersPage = new MyOrdersPage(this.page, expect);
    await myOrdersPage.viewOrder(orderId);
    const orderSummaryPage = new OrderSummaryPage(this.page, expect);
    await orderSummaryPage.validateOrderId(orderId);
    this.page.close();
});

When('user enters {string} as email id and {string} as password', async function (emailId, password) {
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const username = this.page.locator('#username');
    const password_locator = this.page.locator('#password');
    const signInBtn = this.page.locator('#signInBtn');
    await username.fill(emailId);
    await password_locator.fill(password);
    await signInBtn.click();
});

Then('incorrect login message should be displayed', async function () {
    await expect(this.page.getByText(/.+username\/password\./i)).toContainText('Incorrect');
});