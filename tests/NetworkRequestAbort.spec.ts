import {test} from '@playwright/test';

test('Block Image and CSS calls', async({page}) => {
    const start = performance.now();

    // Block CSS calls
    await page.route('**/*.css', route => route.abort());

    // Block image calls
    await page.route('**/*.{jpg,png,jpeg}', route => route.abort());

    // Log all calls
    page.on('response', response => console.log(
        '========API CALL========\n',
        'url: ' + response.url() + '\n',
        'status: ' + response.status() + '\n',
        '\n\n'
    ));

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    const stop = performance.now()

    console.log('It took ' + (stop - start) + ' ms.');
});