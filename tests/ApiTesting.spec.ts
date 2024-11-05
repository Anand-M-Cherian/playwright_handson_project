import {expect, test, request} from '@playwright/test';
import {ApiUtils} from '../utils/ApiUtils';
let token : string;
let orderID: string;
const loginPayload = {
    userEmail: 'order_test@example.com',
    userPassword: 'Password123!@'
};
const createOrderPayload = {
    orders: [
        {
            country: "Canada",
            productOrderedId: "6581ca399fd99c85e8ee7f45"
        }
    ]
};

test.beforeAll(async() => {
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayload);
    token = (await apiUtils.getTokenAndUserID()).token
    orderID = await apiUtils.creatOrder(token, createOrderPayload);
});

test('Bypas Login with API', async({page}) => {
    // injecting token into the browser local storage
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto('https://rahulshettyacademy.com/client/');
});

test('Place Order with API and validate order in My Orders Page', async({page}) => {
    // injecting token into the browser local storage
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto('https://rahulshettyacademy.com/client/');
    
    // Go to orders page
    await page.getByRole('navigation')
        .getByRole('button', {name: 'ORDERS'}).click();
    await page.waitForLoadState('networkidle');

    // validate order id in order history table
    await expect(
        page.getByRole('table')
            .getByRole('row')
            .getByRole('rowheader')
            .last()
    ).toContainText(orderID);
});

test('Optimized Place Order with API and validate order in My Orders Page', async({page}) => {
    // injecting token into the browser local storage
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto('https://rahulshettyacademy.com/client/');

    // Go to cart page
    await page.getByRole('navigation')
        .getByRole('button', {name: 'ORDERS'}).click();
    await page.waitForLoadState('networkidle');

    // validate order id in order history table
    await expect(
        page.getByRole('table')
            .getByRole('row')
            .getByRole('rowheader')
            .last()
    ).toContainText(orderID);
});

test.afterAll(async() => {
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayload);   
    await apiUtils.deleteOrder(token, orderID);
})