import { expect, test } from '@playwright/test'

test('Taking Screenshots', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    const element = page.getByPlaceholder('Hide/Show Example');

    // checking for visibility
    await element.scrollIntoViewIfNeeded();
    await page.screenshot({ path: 'screenshots/page_screenshot.png' });
    await expect(element).toBeVisible();

    // check for hidden
    await page.getByRole('button', { name: 'Hide' }).click();
    await page.locator('fieldset')
        .filter({ hasText: 'Element Displayed Example' })
        .screenshot({ path: 'screenshots/fieldset_screenshot.png' })
    await expect(element).toBeHidden();
});

test('File to File comparisons of image', async ({ page }) => {
    await page.goto('https://www.timeanddate.com/worldclock/india/new-delhi');

    // Check reference image. If no such image, create one now.
    expect(await page.screenshot()).toMatchSnapshot('reference.png');

});