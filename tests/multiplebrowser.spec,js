import{test,chromium} from "@playwright/test"

test ('multiple context example', async ({page}) => {
    const browser = await chromium.launch(); // launch a new browser instance

// create two independent browser context 
const context1 = await browser.newContext(); // new incognito browser context
const context2 = await browser.newContext(); // another new incognito browser context

// create a page in the first context and navigate to a website
const page1 = await context1.newPage(); // new page in the first context
await page1.goto('https://www.google.com/'); // navigate to Google in the first context

// create a page in the second context and navigate to a different website
const page2 = await context2.newPage(); // new page in the second context
await page2.goto('https://www.rediff.com/'); // navigate to Rediff in the second context

// perform actions on the first page
await page1.fill('input[name="q"]', 'Playwright'); // fill the search box on Google
await page1.press('input[name="q"]', 'Enter'); // press Enter to search

await context1.close(); // close the first context, which will close page1
await context2.close(); // close the second context, which will close page2
await browser.close(); // close the browser instance
});
