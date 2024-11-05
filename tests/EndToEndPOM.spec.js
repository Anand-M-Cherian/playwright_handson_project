const { test, expect } = require('@playwright/test');
const {LoginPage} = require('../PageObjects/LoginPage');
const {ProductsListingPage} = require('../PageObjects/ProductsListingPage');
const {CartPage} = require('../PageObjects/CartPage');
const {PaymentPage} = require('../PageObjects/PaymentPage');
const {OrderConfirmationPage} = require('../PageObjects/OrderConfirmationPage');
const {MyOrdersPage} = require('../PageObjects/MyOrdersPage');
const {OrderSummaryPage} = require('../PageObjects/OrderSummaryPage');
const testDataSets = JSON.parse(JSON.stringify(require('../utils/EndToEndPOMTestData.json')));
const {testWithDataAsFixture} = require('../utils/TestDataFixture');

for (const testData of testDataSets) {
    test(`End to End Ecommerce Purchase Order Test for produce ${testData.requriedProduct}`, async ({page}) => {
        const requriedProduct = testData.requriedProduct;
        const emailId = testData.emailId;
        const password = testData.password;
        const country = testData.country;
        const cvv = testData.cvv;
        const nameOnCard = testData.nameOnCard;
        const coupon = testData.coupon;
    
        // =======Login Page=======
        const loginPage = new LoginPage(page, expect);
        await loginPage.openPage();
        await loginPage.login(emailId, password);
        
        await page.waitForLoadState('networkidle');
    
        // =======Products Listing Page=======
        const productsListingPage = new ProductsListingPage(page, expect);
        const price = await productsListingPage.getProductPrice(requriedProduct);
        await productsListingPage.addProductToCart(requriedProduct);
        await productsListingPage.goToCartPage();
    
        await page.waitForLoadState('networkidle');
    
        // =======Cart Page=======
        const cartPage = new CartPage(page, expect);
        await cartPage.validateProductPrice(requriedProduct, price);
        await cartPage.checkout();
    
        await page.waitForLoadState('networkidle');
    
        // =======Payment Page=======
        const paymentPage = new PaymentPage(page, expect);
        await paymentPage.selectCountry(country);
        await paymentPage.validateSelectedCOuntry(country);
        await paymentPage.enterCVV(cvv);
        await paymentPage.enterNameOnCard(nameOnCard);
        await paymentPage.applyCoupon(coupon);
        await paymentPage.validateCouponApplied();
        await paymentPage.validateEmailId(emailId);
        await paymentPage.placeOrder();
    
        // =======Order Confirmation Page=======
        const orderConfirmationPage = new OrderConfirmationPage(page, expect);
        await orderConfirmationPage.validateThankYouMessage();
        const orderId = await orderConfirmationPage.captureOrderId();
        await orderConfirmationPage.goToMyOrders();
    
        // =======My Orders Page=======
        const myOrdersPage = new MyOrdersPage(page, expect);
        await myOrdersPage.viewOrder(orderId);
    
        // =======Order Confirmation Page=======
        const orderSummaryPage = new OrderSummaryPage(page, expect);
        await orderSummaryPage.validateOrderId(orderId);
    });
}

testWithDataAsFixture('Test With Data as Fixture', async({page, testDataFixture}) => {
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.getByPlaceholder('Email').fill(testDataFixture.emailId);
    await page.getByPlaceholder('Passsword').fill(testDataFixture.password);
    await page.locator('#login').click();
    console.log('test data with fixture');
})