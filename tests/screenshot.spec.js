const{test,expect} = require('@playwright/test');

test.describe.configure({mode:'parallel'});// configure the test suite to run tests in serial mode, meaning that tests will be executed one after the other instead of in parallel. This is useful when tests have dependencies or when you want to ensure a specific order of execution. 


test("Screenshot & Visual comparision",async({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path:'partialScrenshot.png'});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path:'screenshot.png'});
    await expect(page.locator("#displayed-text")).toBeHidden();
});

test ('Visual',async({page})=>
{
      await page.goto("https://www.flightaware.com/");
      expect(await page.screenshot()).toMatchSnapshot('homepage.png');



});