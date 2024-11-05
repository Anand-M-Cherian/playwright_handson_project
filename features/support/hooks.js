const playwright = require('@playwright/test');
const { Before, After, AfterStep, Status, BeforeStep } = require('@cucumber/cucumber');

Before(async function() {
    const browser = await playwright.chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    this.page = await context.newPage();
});

BeforeStep({tags: "@negative"}, function() {
    console.log("I run before every step of the negative scenarios");
});

AfterStep(async function({result}) {
    if (result.status === Status.FAILED)
        await this.page.screenshot({ path: 'screenshots/cucumber/page_screenshot.png' });
});

After(function() {
    console.log("I run after every scenario");
});