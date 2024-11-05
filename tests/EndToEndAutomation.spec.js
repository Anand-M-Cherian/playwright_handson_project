const { test, expect } = require('@playwright/test');
const { name } = require('../playwright.config');
const { link } = require('fs');

test('End to End Ecommerce Purchase Order Test', async ({page}) => {
    // hit the url
    await page.goto('https://rahulshettyacademy.com/client/');

    // enter login credentials and login
    await page.getByPlaceholder('Email').fill('fullstackdeveloper+1234@gmail.com');
    await page.getByPlaceholder('Passsword').fill('Password123!@#');
    await page.getByRole('button', {name: "Login"}).click();

    const requriedProduct = "ADIDAS ORIGINAL";
    await page.waitForLoadState('networkidle');

    // fetch the price
    let price = await page
        .locator('div.card-body')
        .filter({ hasText:  requriedProduct})
        .getByText('$')
        .textContent();
    console.log(price);

    // add product to cart
    await page
        .locator('div.card-body')
        .filter({ hasText:  requriedProduct})
        .getByRole('button').filter({ hasText: 'add to cart'})
        .click();
    
    // Go to cart page
    await page.getByRole('button', {name: /.+cart.+/i}).click();
    await page.waitForLoadState('networkidle');

    // assert product price
    await expect(page
        .getByRole('list')
        .filter({ hasText:  requriedProduct})
        .locator('div.cartSection')
        .filter({
            has: page.getByRole('heading', {name: requriedProduct})
        })
        .getByText('$')
    ).toContainText('MRP ' + price);

    // checkout from cart page and go to payment page
    await page.getByRole('button', {name: 'Checkout'}).click();

    // auto suggestive dropdown for country
    await page.getByPlaceholder('Select Country').pressSequentially('india', {delay: 500});
    const dropDownList = page.locator('section.ta-results');
    // click with delay
    await dropDownList
        .getByRole('button')
        .filter({hasText: /^\sindia$/i})
        .click({delay: 1000});
    // ensure country value has been entered
    await expect(page.getByPlaceholder('Select Country')).toHaveValue('India');

    // fill other shipping information and place order
    // CVV Code
    await page.locator('div.field')
        .filter({hasText: 'CVV Code'})
        .getByRole('textbox')
        .fill('123');
    // Name on card
    await page.locator('div.field')
        .filter({hasText: 'Name on Card'})
        .getByRole('textbox')
        .fill('Anand M Cherian');
    // Name on card
    await page.locator('div.field')
        .filter({hasText: 'Name on Card'})
        .getByRole('textbox')
        .fill('Anand M Cherian');
    // Apply coupon
    await page.locator('div.field')
        .filter({hasText: 'Apply Coupon'})
        .getByRole('textbox')
        .fill('rahulshettyacademy');
    await page.getByRole('button', {name: 'Apply Coupon'}).click();
    
    // Validate coupon applied
    await page.locator('div.field')
        .filter({hasText: 'Apply Coupon'})
        .getByRole('paragraph')
        .waitFor();
    const couponApplied = page.locator('div.field')
        .filter({hasText: 'Apply Coupon'})
        .getByRole('paragraph');
    await expect(couponApplied).toContainText('* Coupon Applied');
    // Validate username email id
    await expect(page.locator('div.user__name')
        .locator('label')
    ).toContainText('fullstackdeveloper+1234@gmail.com');

    // place order and go to order success page
    await page.getByText ('Place Order').click();

    // validate thank you message
    await expect(page.getByRole('table')
        .getByRole('heading')
    ).toContainText(/\sthankyou for the order.\s/i);

    // capture order id
    let orderId = await page.getByRole('table')
        .locator('label')
        .last()
        .textContent();
    // clearn up order and remove pipeline delimiters\
    orderId = orderId.split('|')[1].trim().split('|')[0].trim();
    console.log(orderId);
    // go to order history page
    await page.getByRole('button', {name: 'ORDERS'}).click();

    // filter our order and click view button to view order
    await page.getByRole('table')
        .getByRole('row')
        .filter({hasText: orderId})
        .getByRole('button', {name: 'View'})
        .click();

    // validate order id
    await expect(page.locator('div')
        .filter({hasText: 'Order Id'})
        .locator('div.-main')
    ).toContainText(orderId);
});