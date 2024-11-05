import {expect, Frame, test} from '@playwright/test'

test('Element Visibility Test', async({page}) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    const element = page.getByPlaceholder('Hide/Show Example');

    // checking for visibility
    await expect(element).toBeVisible();

    // check for hiddent
    await page.getByRole('button', {name: 'Hide'}).click();
    await expect(element).toBeHidden();
});

test('Handle Dialogs / Popups', async({page}) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    page.on('dialog', dialog => dialog.accept());

    await page.getByRole('button', {name: 'Confirm'}).click();
});

test('Mouse Hover', async({page}) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    await page.getByRole('button', {name: 'Mouse Hover'}).hover();
    await page.getByRole('link', {name: 'Reload'}).click();
});

test('Handle Frames', async({page}) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    const frame = page.frame('iframe-name');
    // const frame = page.frame({url: 'https://rahulshettyacademy.com/'});
    // const frame = page.frameLocator('#courses-iframe');
    
    if (frame === null)
        throw new Error('iFrame not found');

    await frame.getByRole('link', {name: 'All Access plan'}).click();

    let subscriber_count = await frame
        .getByRole('heading', {name: ' Happy Subscibers!'})
        .textContent();
    
    if (subscriber_count === null)
            throw new Error('Suubcriber count hero text not found in iFrame');
    
    subscriber_count = subscriber_count.split(' ')[1];

    console.log(subscriber_count);
});