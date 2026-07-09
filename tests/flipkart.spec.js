import { test, expect } from '@playwright/test';

test('Flipkartpagetest',async ({page}) => {

    await page.goto('https://www.flipkart.com/');
    await page.getByRole('button',{name:'✕'}).click();
    // 2. Locate the search box using its placeholder text as the accessible name
    const searchBox = page.getByRole('textbox', { name: 'Search for Products, Brands and More' });
    
    // 3. Perform actions sequentially (No chaining!)
    await searchBox.fill('iphone');
    await searchBox.press('Enter');
    
});