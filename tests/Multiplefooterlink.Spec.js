import { context } from '@cucumber/cucumber';
import {test,expect} from '@playwright/test';

test('Professional courier footer',async ({page}) => {


    //launch the vanguard website
    await page.goto('https://www.tpcindia.com/Default.aspx');
    // Apply wait for the page to load completely
    await page.waitForLoadState('load');// wait for the page to load completely before proceeding with further actions
    
    const footerLinks = page.locator("div.links").first().locator("a");
    const linkCount = await footerLinks.count();
    console.log("Number of links in the footer:", linkCount);

    for (let i = 0; i < linkCount; i++) {
    console.log(await footerLinks.nth(i).innerText());
    }
});
   
test('Footer Links', async ({ page }) => {

    await page.goto('https://www.tpcindia.com/Default.aspx');

    const footerLinks = page.locator("footer").getByRole("link");

    const count = await footerLinks.count();

    console.log("Total Footer Links:", count);

    for (let i = 0; i < count; i++) {
        console.log(await footerLinks.nth(i).innerText());
    }
});

// Social Media Links

test.only('Verify Social Media Links', async ({ page, context }) => {

    // Step 1: Open the application
    await page.goto('https://www.tpcindia.com/Default.aspx');

    // Step 2: Locate all social media links
    const socialLinks = page.locator("div.socialLinks a");

    // Step 3: Count the links
    const totalLinks = await socialLinks.count();
    console.log("Total Social Media Links:", totalLinks);

    // Step 4: Loop through each social media link
    for (let i = 0; i < totalLinks; i++) {

        console.log("Opening Link:", i + 1);

        // Step 5: Wait for new tab and click the link
        const [newTab] = await Promise.all([
            context.waitForEvent('page'),
            socialLinks.nth(i).click()
        ]);

        // Step 6: Wait for the new tab to load
        await newTab.waitForLoadState();

        // Step 7: Get title and URL
        const title = await newTab.title();
        const url = newTab.url();

        console.log("Title :", title);
        console.log("URL   :", url);

        // Step 8: Validate the URL
        await expect(newTab).toHaveURL(url);

        // Step 9: Close the new tab
        await newTab.close();

        console.log("Closed Link:", i + 1);
    }

    // Step 10: Verify we are still on the home page
    await expect(page).toHaveURL("https://www.tpcindia.com/Default.aspx");
});


