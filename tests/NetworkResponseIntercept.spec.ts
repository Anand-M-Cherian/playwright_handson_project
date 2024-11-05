import {expect, test, request} from '@playwright/test';
import {ApiUtils} from '../utils/ApiUtils';
let token : string;
let userId : string;
const loginPayload = {
    userEmail: 'fullstackdeveloper+1234@gmail.com',
    userPassword: 'Password123!@#'
};
const mockedEmptyOrdersResponse = {
    data:[],
    message:"No Orders"
};

test.beforeAll(async() => {
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayload);
    const tokenAndUserID = await apiUtils.getTokenAndUserID();
    token = tokenAndUserID.token;
    userId = tokenAndUserID.userID;
});

test('Validate empty order page by intercepting orders api call', async({page}) => {
    // injecting token into the browser local storage
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    // bypass login and go to dashboard
    await page.goto('https://rahulshettyacademy.com/client/');

    // mock orders api call
    const get_orders_url = 'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/';
    await page.route(get_orders_url + userId, async route => {
        const actualOrdersResponse = await page.request.fetch(route.request());
        route.fulfill({
            response: actualOrdersResponse,
            body: JSON.stringify(mockedEmptyOrdersResponse)
        });
    });

    // Go to orders page
    await page.getByRole('navigation')
        .getByRole('button', {name: 'ORDERS'}).click();
    await page.waitForResponse(get_orders_url + userId);

    // validate message for empty order history
    const no_order_message = await page.getByText('No Orders to show').textContent();
    console.log(no_order_message);
    await expect(page.getByText('No Orders to show')).toBeVisible();
});