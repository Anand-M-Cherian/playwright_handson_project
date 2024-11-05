import {test, expect} from '@playwright/test';

test("Calendar Validations", async({browser}) => {
    // required date details
    const required_date : Date = new Date(Date.parse("03/15/2025"));
    const required_month : string = required_date.toLocaleString('default', { month: 'long' });
    const required_day : string = required_date.getDate().toString();
    const required_year : string = required_date.getFullYear().toString();

    // current date details
    const current_date : Date = new Date();
    const current_month : string = current_date.toLocaleString('default', { month: 'long' });
    const current_year : string = current_date.getFullYear().toString();

    // initializing context and homepage
    const context = await browser.newContext();
    const homepage = await context.newPage();
    await homepage.goto("https://rahulshettyacademy.com/seleniumPractise/#/");

    // handling new page
    const offersPagePromise = context.waitForEvent('page');
    await homepage.getByRole('link', { name: 'Top Deals' }).click();
    const page = await offersPagePromise;

    // click calendar input box to show calendar pop up
    await page.getByPlaceholder('----').click();

    // click on "month year" to go to list of months
    await page.getByRole('button', {name: current_month + ' ' + current_year}).click();

    // click on "year" to go to list of years
    await page.getByRole('button', {name: current_year, exact: true}).click();
    
    // select the required year
    await page.getByRole('button', {name: required_year, exact: true}).click();

    // select the required month
    await page.getByRole('button', {name: required_month}).click();

    // select the required day
    await page.getByRole('button', {name: required_day}).click();

    // validate date
    const month_number = (required_date.getMonth() + 1).toString();
    await expect(page.getByPlaceholder('--').nth(0)).toHaveValue(month_number);
    await expect(page.getByPlaceholder('--').nth(1)).toHaveValue(required_day);
    await expect(page.getByPlaceholder('----')).toHaveValue(required_year);
});