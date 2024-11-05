import { expect, test, request } from '@playwright/test';
import { ApiUtils } from '../utils/ApiUtils';
let token: string;
const loginPayload = {
    userEmail: 'fullstackdeveloper+1234@gmail.com',
    userPassword: 'Password123!@#'
};


test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayload);
    const tokenAndUserID = await apiUtils.getTokenAndUserID();
    token = tokenAndUserID.token;
});

test('Security Testing - IDOR', async ({ page }) => {
    // injecting token into the browser local storage
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    // bypass login and go to dashboard
    await page.goto('https://rahulshettyacademy.com/client/');

    // Go to orders page
    await page.getByRole('navigation')
        .getByRole('button', { name: 'ORDERS' }).click();

    // get ready to mock network request
    const getOrderDetailsUrl = 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=';
    await page.route(getOrderDetailsUrl + '*', route => route.continue({
        url: getOrderDetailsUrl + '71d476dae2afd4c6199ba23'
    }));

    // View the first order
    await page.getByRole('table')
        .getByRole('row')
        .last()
        .getByRole('button', { name: 'View' })
        .click();
    // await page.pause();

    // validate message for 403 unauthorized
    await expect(
        page.getByText('You are not authorize to view this order')
    ).toBeVisible();
});
