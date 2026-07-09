import{test,chromium} from "@playwright/test"

test ('multiple context example', async () => {
    const browser = await chromium.launch();

// create two independent browser context 
const context1 = await browser.newContext();
const context2 = await browser.newContext();

// create a page in the first context and navigate to a website
const page1 = await context1.newPage();
await page1.goto('https://www.google.com/');

// create a page in the second context and navigate to a different website
const page2 = await context2.newPage();
await page2.goto('https://www.rediff.com/');

await context1.close();
await context2.close();
});
