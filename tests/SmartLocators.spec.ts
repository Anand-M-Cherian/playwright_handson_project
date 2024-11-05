import {test} from '@playwright/test';

test('Using Smart Locators', async({page}) => {
    await page.goto('https://rahulshettyacademy.com/angularpractice/');

    // Fill form elements and submit details
    await page.getByLabel('Check me out if you Love IceCreams!').click();
    await page.getByLabel('Employed').click();
    await page.getByPlaceholder('Password').fill('Password123!@');
    await page.locator('input[name="email"]').fill('anand@yougotagift.com');
    await page.getByLabel('Gender').selectOption('Female');
    await page.getByRole('button', {name: 'Submit'}).click();
    const message = await page.getByText('Form has been submitted').textContent();
    console.log(message);

    // Go to shop and select Nokia Edge product
    await page.getByRole('link', {name: 'Shop'}).click();
    await page.locator('div.card-body')
        .filter({hasText: 'Nokia Edge'})
        .getByRole('link')
        .click();
});