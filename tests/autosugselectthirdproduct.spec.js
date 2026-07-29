import { test, expect } from '@playwright/test';

test('Select third auto-suggestion item from Google Search using default locators', async ({ page }) => {
    // 1. Navigate to Google
    await page.goto('https://www.google.com/');

    // 2. Locate the search input field and type 'laptop'
    const searchBox = page.locator('textarea[name="q"]');
    await searchBox.fill('laptop');

    // 3. Target the presentation list items that are physically visible on screen
    // Adding ':visible' prevents Playwright from getting stuck on hidden layout containers
    const dynamicSuggestions = page.locator('li[role="presentation"]:visible');

    // 4. Wait for the visible suggestion items to render in the DOM tree
    await dynamicSuggestions.first().waitFor({ state: 'visible', timeout: 5000 });

    // 5. Isolate the 3rd element item using index 2 (0 = 1st, 1 = 2nd, 2 = 3rd)
    const thirdSuggestion = dynamicSuggestions.nth(2);

    // Print text to terminal console log for clear runtime confirmation
    const textContent = await thirdSuggestion.innerText();
    console.log(`Clicking the third auto-suggestion option: ${textContent}`);

    // 6. Execute the click action sequence
    await thirdSuggestion.click();

    // 7. Verify the search results page URL loaded successfully
    await expect(page).toHaveURL(/search/);
});



