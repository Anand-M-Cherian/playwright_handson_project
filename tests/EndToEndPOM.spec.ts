import { test, expect } from '@playwright/test';
import {LoginPage} from '../PageObjects_ts/LoginPage';
import {ProductsListingPage} from '../PageObjects_ts/ProductsListingPage';
import {CartPage} from '../PageObjects_ts/CartPage';
import {PaymentPage} from '../PageObjects_ts/PaymentPage';
import {OrderConfirmationPage} from '../PageObjects_ts/OrderConfirmationPage';
import {MyOrdersPage} from '../PageObjects_ts/MyOrdersPage';
import {OrderSummaryPage} from '../PageObjects_ts/OrderSummaryPage';
import {testWithDataAsFixture} from '../utils/TestDataFixture_ts';

const testDataSets = JSON.parse(JSON.stringify(require('../utils/EndToEndPOMTestData.json')));

for (const testData of testDataSets) {
    test(`End to End Ecommerce Purchase Order Test for produce ${testData.requriedProduct}`, async ({page}) => {
        const requriedProduct = testData.requriedProduct;
        const emailId = testData.emailId;
        const password = testData.password;
        const country = testData.country;
        const cvv = testData.cvv;
        const nameOnCard = testData.nameOnCard;
        const coupon = testData.coupon;

        // BAD usage of type. NEED TO CHANGE
        let price: any;
    
        // =======Login Page=======
        const loginPage = new LoginPage(page, expect);
        await loginPage.openPage();
        await loginPage.login(emailId, password);
        
        await page.waitForLoadState('networkidle');
    
        // =======Products Listing Page=======
        const productsListingPage = new ProductsListingPage(page, expect);
        price = await productsListingPage.getProductPrice(requriedProduct);
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