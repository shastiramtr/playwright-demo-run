const{test,expect} = require('@playwright/test');

test ('Locator strategies in Playwright', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/angularpractice/');

    //Locator strategies in Playwright get by lable
    // check the checkbox using label text
    await page.getByLabel('Check me out if you Love IceCreams!').click();
    //radio button selection using label text
    await page.getByLabel('Employed').check(); // for form field with label text 'Employed' and type 'radio'
    //select the option from dropdown using label text
    await page.getByLabel("Gender").selectOption('Female');
    //get by placeholder text
    await page.getByPlaceholder('Password').fill('Playwright@123');
    //get by role
    await page.getByRole('button', { name: 'Submit' }).click(); // accessibility-focusable element with role 'button' and name 'Submit'
    //get by text -> For visible text content of an element
    await expect(page.getByText('Success! The Form has been submitted successfully!.')).toBeVisible();
    //get by role used link text
    await page.getByRole('link', { name: 'Shop' }).click();
    // First locator strategy multiple elements with same text than using filter select particular element 
    // than click on add button click on add button for the product with text 'Blackberry' 
    await page.locator('app-card').filter({ hasText: 'Blackberry' }).getByRole('button', { name: 'Add ' }).click();
    

    await page.getByRole('button', { name: 'Continue without choosing a' }).click();
    


    
});