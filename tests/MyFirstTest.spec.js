const { test, expect } = require('@playwright/test');

test.describe.configure({mode: 'parallel'});

test('@smoke Test with context', async ({browser}) => {

    // opening browser, page and navigating to URL
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    // defining login page elements
    const username = page.locator('#username');
    const password = page.locator('#password');
    const signInBtn = page.locator('#signInBtn');

    // invalid login
    await username.fill('anand@gmail.com');
    await password.fill('password');
    await signInBtn.click();
    await expect(page.getByText(/.+username\/password\./i)).toContainText('Incorrect');

    // valid login
    await username.fill('rahulshettyacademy');
    await password.fill('learning');
    await signInBtn.click();
    console.log(await page.locator('.card-body a').nth(1).textContent());
    await expect(page.getByRole('link', {name: /iphone\s[a-z]+/i})).toContainText('X');
});

test('Test without context', async ({page}) => {
    await page.goto("https://www.google.com/");
    await expect(page).toHaveTitle("Google");

    // To fail this test uncomment below step
    // await page.getByRole('button', {name: 'Hello World'}).click();
});

test('array of elements homework 1', async ({page}) => {
    const first_name = makeid(5);
    const last_name = makeid(5);

    await page.goto('https://rahulshettyacademy.com/client/');

    // register user
    await page.getByRole('link', {name: 'Register'}).click();

    // enter details of the user
    await page.getByLabel('First Name').fill(first_name);
    await page.getByLabel('Last Name').fill(last_name);
    await page.getByPlaceholder('email@example.com').fill(first_name + last_name + '@gmail.com');
    await page.getByPlaceholder('enter your number').fill('1234567890');
    await page.getByPlaceholder('Passsword').and(
        page.locator('#userPassword')
    ).fill('Password123!@#')
    await page.getByLabel('Confirm Password').fill('Password123!@#');
    await page.getByRole('checkbox').click();
    await page.getByRole('button', {name: 'Register'}).click();

    // navigate to login page
    await page.getByRole('button', {name: 'Login'}).click();

    // enter login credentials
    await page.getByPlaceholder('Email').fill(first_name + last_name + '@gmail.com');
    await page.getByPlaceholder('Passsword').fill('Password123!@#');
    await page.locator('#login').click();
});

test('@smoke array of elements homework 2', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/client/');

    // enter login credentials
    await page.getByPlaceholder('Email').fill('fullstackdeveloper+1234@gmail.com');
    await page.getByPlaceholder('Passsword').fill('Password123!@#');
    await page.locator('#login').click();
    
    // wait for product list to load. Otherwise we get empty list
    // await page.waitForLoadState('networkidle');
    // await page.locator('div.card-body b').last().waitFor();
    console.log(await page.locator('div.card-body b').allTextContents());
});

test('@smoke @sanity UI Contols Test', async ({page}) => {
    // opening browser, page and navigating to URL
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    // defining login page elements
    const username = page.locator('#username');
    const password = page.locator('#password');
    const signInBtn = page.locator('#signInBtn');
    const selectUser = page.locator('select.form-control');
    const userRadioBtn = page.locator('.radiotextsty').last();
    const okayBtn = page.getByRole('button', {name: 'Okay'});
    const termsCheck = page.locator('#terms');
    const blinkLink = page.getByRole('link', {name: /Free Access.+/i});

    // valid login credentials
    await username.fill('rahulshettyacademy');
    await password.fill('learning');
    await userRadioBtn.click();
    await okayBtn.click()
    await selectUser.selectOption('Teacher');

    // assert whether radiobutton is checked
    console.log("user radio button: " + await userRadioBtn.isChecked());
    await expect(userRadioBtn).toBeChecked();

    // assert whether checkbox is checked
    await termsCheck.click();
    console.log("terms checkbox button: " + await termsCheck.isChecked());
    await expect(termsCheck).toBeChecked();
    
    // assert whether checkbox is unchecked
    await termsCheck.uncheck();
    console.log("terms checkbox button: " + await termsCheck.isChecked());
    expect(await termsCheck.isChecked()).toBeFalsy();

    // assert whether an element has a particular attribute value
    await expect(blinkLink).toHaveAttribute(
        'class', // attribute name
        'blinkingText' // attribute value
    );
});

test('@sanity Handle new tab', async ({browser}) => {
    // opening browser, page and navigating to URL
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    // defining elements
    const resourceLink = page.getByRole('link', {name: /Free Access.+/i});
    

    // wait until all promises are fulfilled
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        resourceLink.click()
    ]);

    // defining elements
    const redParagraphTextLocator = newPage.locator('p.red');
    const redParagraphText = await redParagraphTextLocator.textContent();

    // getting the domain
    const domain = redParagraphText.split('@')[1].split(' ')[0].split('.')[0];

    // defining login page elements
    const username = page.locator('#username');
    const password = page.locator('#password');
    const signInBtn = page.locator('#signInBtn');

    // valid login
    await username.fill(domain);
    await password.fill('learning');
    await signInBtn.click();
});

// utility funnctons

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}