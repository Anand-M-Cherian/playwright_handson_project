import {test, expect, BrowserContext} from '@playwright/test';
let webContext : BrowserContext;

test.beforeAll(async({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.getByPlaceholder('Email').fill('fullstackdeveloper+1234@gmail.com');
    await page.getByPlaceholder('Passsword').fill('Password123!@#');
    await page.getByRole('button', {name: "Login"}).click();

    // important step. otherwise playwright stores empty session
    await page.waitForLoadState('networkidle')

    await context.storageState({path: 'utils/storage_state.json'});
    webContext = await browser.newContext({storageState: 'utils/storage_state.json'});
    await context.close();
});

test('Create context with stored state to bypass login', async () => {
    const page = await webContext.newPage();
    
    await page.goto('https://rahulshettyacademy.com/client/');
});