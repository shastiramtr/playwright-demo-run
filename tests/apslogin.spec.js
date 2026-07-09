const{test,expect} = require('@playwright/test');

test ('APS Login',async({page}) => {
    test.setTimeout(60000);
        const email = "shastiram.rajasekar@bourne-leisure.co.uk";
        const password = "Login@123";
        //calenter 
        const month = 'December';
        const year = '2026';
        const date = '4';
        
    await page.goto('https://warner.stage.aboveproperty.com/v2/#/login');
    await page.locator('#email').fill(email);
    await page.locator('#password').fill(password);
    await page.locator('.login__actions').click();
    await page.getByRole('combobox', { name: 'Search' }).click();
    await page.getByRole('combobox', { name: 'Search' }).fill('WASW');
    await page.waitForTimeout(5000);
    await page.getByRole('combobox', { name: 'Search' }).press('Enter');
    await page.getByRole('listitem', { name: 'Front Desk' }).getByLabel('Toggle Menu Item').click();
    await page.getByRole('link', { name: 'Call Center' }).click();
    await page.locator('#newBooking').click();
    await page.locator('#arrivalDate').click();//calenter
    await page.getByLabel('Change Month').selectOption(month);
    await page.getByLabel('Change Year').selectOption(year);
    await page.getByRole('gridcell', { name: date, exact: true }).click();
    await page.locator('#searchParamsNights').selectOption('3 Nights');
    await page.locator('#searchParamsSearch').click();

await page.pause();
});