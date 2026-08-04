import { test, expect } from '@playwright/test';

test('snapdeal apply discount and print top 10 products', async ({ page }) => {
    await page.goto('https://www.snapdeal.com/');
    
    // 1. Search
    const search = page.locator('#search-box-input');
    await search.fill('electronic');
    await search.press("Enter");
    
    // 2. Wait for the discount filter container
    await page.waitForSelector('div[data-name="discount"]');
    
    // 3. Print discount list for debugging
    const discountList = await page.locator('div[data-name="discount"] label a').allInnerTexts();
    console.log("Discount list: " + discountList);

    // 4. Target all discount labels
    const discountOptions = page.locator('div[data-name="discount"] label');

    // 5. Pick the 5th option (index 4)
    const fifthOption = discountOptions.nth(4);
    const selectedText = await fifthOption.innerText();
    console.log(`\nSelecting 5th option: ${selectedText.trim()}`);

    // 6. Click to apply the filter
    await fifthOption.click();
    
    // 7. WAIT for the products to update after clicking the filter.
    // A brief timeout ensures Snapdeal's background loading finishes.
    await page.waitForTimeout(3000); 

    // 8. Grab all product titles currently loaded on the page
    const productTitles = await page.locator('.product-title').allInnerTexts();
    
    // 9. Loop exactly 10 times (from 0 to 9)
    console.log("\n--- Top 10 Discounted Products ---");
    for (let i = 0; i < 10; i++) {
        // Ensure the product exists (just in case there are fewer than 10 results)
        if (productTitles[i]) {
            console.log((i + 1) + ": " + productTitles[i]);
        }
    }

    await page.pause();
});