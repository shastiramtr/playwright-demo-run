const { test } = require('@playwright/test');

//Playwright Interview Question
//Explain Browser, BrowserContext, and Page with a Real-Time Example 
//This is one of the most common Playwright interview questions.

test('Browser Context Example', async ({ browser }) => {


    // Create Browser Context
    const context = await browser.newContext();

    // Create Page (Browser Tab)
    const page = await context.newPage();

    await page.goto('https://google.com');

    console.log(await page.title());

});