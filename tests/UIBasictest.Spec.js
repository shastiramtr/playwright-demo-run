const {test,expect} = require('@playwright/test');
const { only } = require('node:test');


test ('browser context Playwright test',async ({browser}) =>
{
// Playwright code goes here 
 // Context and page are created from the browser instance.
 // contxt mean chrome -> Plugin / extension Cookies / local storage
          const context = await browser.newContext();
          const page = await context.newPage();
          const username = page.locator('#email');
          const password = page.locator('#password');
          const signInButton = page.locator("[type='submit']");
          await page.goto('https://warner.stage.aboveproperty.com/v2/#/login');
          await console.log(await page.title());
          await username.fill('shastiram.rajasekar@bourne-leisure.co.uk');
          await password.fill('Login123');
          await signInButton.click();
          const notificationText = await page.locator("div.c-notification__content").textContent();
          console.log(notificationText);
          //Assertions
          await expect(page.locator("div.c-notification__content")).toHaveText('Sign in failed. Invalid email address or password.');
        
        
        
        });

// test.only ('UI Controls',async ({page}) =>
// {

//   await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
//           const username = page.locator('#username');
//           const password = page.locator('#password');
//           const documentlist = page.locator("[href*='documents-request']");
//           //radio button
//           await page.locator('.radiotextsty').last().click();
//           await page.locator('#okayBtn').click();
//           console.log(await page.locator('.radiotextsty').last().isChecked()); // return boolean value
//           // expect assertion outside the test block
//           await expect (page.locator('.radiotextsty').last()).toBeChecked();

//           //dropdown
//           const dropdown = page.locator("select.form-control");
//           await dropdown.selectOption('consult');
//           // Checkbox
//           await page.locator('#terms').click();
//           // expect assertion outside the test block
//           await expect(page.locator('#terms')).toBeChecked();
//           await page.locator('#terms').uncheck();
//           // expect asserction perform inside this bracket
//           expect (await page.locator('#terms').isChecked()).toBeFalsy();
//           //Blinging text
//           await expect(documentlist).toHaveAttribute('class','blinkingText');

test ('child window handling',async ({browser}) =>
{
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  const username = page.locator('#username');
  const documentlist = page.locator("[href*='documents-request']");
  
  const [newPage] = await Promise.all([ // (array)wait for new page to open and click the document list link
  context.waitForEvent('page'), // listener for new page open pending,rejected,fullfilled 
  documentlist.click(), // new page is opened
  ])
     //text = await newPage.locator("//p[@class='im-para red']").textContent();
      //console.log(text);
      //const text = await newPage.locator("p.im-para.red").textContent(); // use CSS selector
       //console.log(text); // output: Please email us at mentor@rahulshettyacademy.com with below template to receive response

      // Split text and get the email address
      const text = await newPage.locator("p.im-para.red").textContent();
      const arraytext = text.split('@');
      const domain = arraytext[1].split(' ')[0];
      console.log(domain); // output: rahulshettyacademy.com
      await username.fill(domain);
      console.log(await username.inputValue());// output: rahulshettyacademy.com

// Code download
// 25)Handling Child windows & Tabs with Playwright by switching browser context
// test('@Child windows hadl', async ({browser})=>
//  {
//     const context = await browser.newContext();
//     const page =  await context.newPage();
//     const userName = page.locator('#username');
//     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
//     const documentLink = page.locator("[href*='documents-request']");
 
//     const [newPage]=await Promise.all(
//    [
//       context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
//       documentLink.click(),
   
//    ])//new page is opened
   
 
//    const  text = await newPage.locator(".red").textContent();
//     const arrayText = text.split("@")
//     const domain =  arrayText[1].split(" ")[0]
//     //console.log(domain);
//     await page.locator("#username").fill(domain);
//     console.log(await page.locator("#username").inputValue());
 
//  })
//})
          // assertion
          //await page.pause();


});  



//test ('Page Playwright test',async ({page}) =>
//{
// Playwright code goes here 
 // Context and page are created from the browser instance.
 // contxt mean chrome -> Plugin / extension Cookies / local storage
          //const context = await browser.newContext();
          //const page = await context.newPage();
    //await page.goto('https://google.com');
    //console.log(await page.title());
    //await expect(page).toHaveTitle('Google');
//});





