const{test,expect} = require('@playwright/test');// import the test and expect functions from the @playwright/test module to write and run tests
const { stat } = require('node:fs');// import the stat function from the node:fs module to work with file system operations
const {LoginPage} = require('../pageobjects/Loginpage');// import the LoginPage class from the pageobjects/Loginpage.js file
const {selectProductWithPrice} = require('../pageobjects/selectProductWithPrice');// import the selectProductWithPrice class from the pageobjects/selectProductWithPrice.js file
const {Payment} = require('../pageobjects/Payment');// import the Payment class from the pageobjects/Payment.js file
//Json->String->js object
const dataset = JSON.parse(JSON.stringify(require("../utils/Testdata.json"))); // import test data from the Testdata.json file and parse it as a JavaScript object to use in the test

for(const data of dataset)
{
test (`IBEbooking with ${data.productName} and ${data.priceType} price`,async({page}) => // define a test case named 'IBEbooking' that takes a page object as an argument to interact with the web page
    {
// extend timeout for this test
  test.setTimeout(120000);// set the timeout for this test to 120 seconds (2 minutes) to allow for longer operations such as page loading and form filling
     //const email ="
//test ('IBEbooking',async({page}) => {// define a test case named 'IBEbooking' that takes a page object as an argument to interact with the web page
    // extend timeout for this test
  //test.setTimeout(120000);// set the timeout for this test to 120 seconds (2 minutes) to allow for longer operations such as page loading and form filling
     //const email ="anu.sasi@warnerhotels.co.uk"// define email and password variables with the provided values
     //const password = "Login@123456";// define email and password variables with the provided values
     //const productName = "Standard"; // define the product name to select
     //const priceType = "Standard"; // define the price type to select
     //const cardnumber = '4012000033330026'; // define the card number to fill in the payment form
     //const expirydate = '0434'; // define the expiration date to fill in the payment form
     //const cvv = '123'; // define the CVV to fill in the payment form
     //const postalcode = 'HP2 4YL'; // define the postal code to fill in the payment form

     const loginpage = new LoginPage(page);// create an instance of the LoginPage class and pass the page object to it
     loginpage.goto();// navigate to the login page using the goto method of the LoginPage class
     await selectProductWithPrice(page, data.productName, data.priceType);
     //await page.locator("form select[title='Please choose a bed configuration:']").selectOption("TWIN");

const bedDropdown = page.locator("form select[title='Please choose a bed configuration:']");// locate the bed configuration dropdown using its title attribute

// Wait up to 10 seconds for the dropdown to be attached to the DOM
await bedDropdown.waitFor({ state: 'attached', timeout: 10000 }).catch(() => null);// if the dropdown is not found within 10 seconds, catch the timeout error and return null to avoid test failure

// Now check visibility and select if present
if (await bedDropdown.isVisible()) {
  await bedDropdown.selectOption({ value: "TWIN" });
  console.log("Bed option selected: TWIN");
} else {
  console.log("Bed dropdown not visible after 10s, skipping...");
}

     //await page.goto('https://book-stg.warnerhotels.co.uk/ibe/WASW/reservations/book?adults=2&arrival=2026-12-04&departure=2026-12-07');    
    //await page.getByRole('button', { name: 'View Prices' }).first().click();// click on view prices button
    //await page.getByRole('button', { name: 'Select' }).first().click();// click on select button for the first available room
    //await page.getByLabel("Please choose a bed ").selectOption("Two Singles");// select the bed type from dropdown using label text
    await page.getByRole('button', { name: 'Continue' }).first().click();// click on Summary continue button to proceed to Addon page
    await page.getByRole('button', { name: 'Skip Addons' }).click();// click on skip addons button to proceed to login page
    //await page.getByRole('textbox', { name: 'Email' }).fill(email);// fill in email field with the provided email
    //await page.getByRole('textbox', { name: 'Password' }).fill(password);// 
    //await page.getByRole('button', { name: 'Log in' }).click();// 
    //await expect(page.getByText('Sign in succeeded.')).toHaveText('Sign in succeeded.');// assert that the login was successful by checking for the presence of a success message
    await loginpage.validlogin(data.email, data.password);// perform a valid login using the validlogin method of the LoginPage class with the provided email and password
    //await page.locator('#firstName-0-1').fill('Automation');// fill in first name field with the provided value
    //await page.locator('#name-0-1').fill('shastiram');// fill in last name field with the provided value
    await page.waitForTimeout(5000);// wait for 5 seconds
    await page.getByRole('button', { name: 'Continue' }).click();// click on continue button to proceed to payment page
    await page.locator('.terms-and-conditions__accept').check();// check the terms and conditions checkbox to accept the terms before proceeding to payment
    await page.getByRole('button', { name: 'Continue' }).click();// 
    const allframes=await page.frames();// get all frames on the page
    console.log('Number of iframes:', allframes.length);//output: Number of iframes: 3
    //await page.locator('iframe[title="Missing translation \\"reservations.payment-info.cc.iframe\\" for locale \\"en\\""]').contentFrame().locator('iframe[title="Payment iframe"]').contentFrame().getByRole('textbox', { name: 'Card Number' }).fill('4012000033330026');
    //await page.frameLocator('.freedompay-3ds').locator('#CardNumber').fill('4012000033330026');
    //Wait for the iframe to appear
    //await page.waitForSelector('.freedompay-3ds', { timeout: 60000 });

    //Get the frame
    //const frame = await page.frameLocator('.freedompay-3ds');

    //Wait for the input inside the frame
    //await frame.locator('#CardNumber').waitFor({ timeout: 60000 });

    //Fill the input
    //await frame.locator('#CardNumber').fill('4012000033330026');

    //await page.frameLocator('.freedompay-3ds').locator('#ExpirationDate').fill('0434');
    //await page.frameLocator('.freedompay-3ds').locator('#SecurityCode').fill('123');
    //await page.frameLocator('.freedompay-3ds').locator('#PostalCode').fill('HP2 4YL');
    
//     // Wait for the outer iframe
// const outerFrameElement = await page.locator(
//   'iframe[title="Missing translation \\"reservations.payment-info.cc.iframe\\" for locale \\"en\\""]'
// );
// const outerFrame = await outerFrameElement.contentFrame();

// // Wait for the inner iframe
// const innerFrameElement = await outerFrame.locator('iframe[title="Payment iframe"]');
// const innerFrame = await innerFrameElement.contentFrame();

// // Now interact with the card number field
// await innerFrame.getByRole('textbox', { name: 'Card Number' }).fill('4012000033330026');
// await innerFrame.getByRole('textbox', { name: 'Expiration Date' }).fill('0434');
// await innerFrame.getByRole('textbox', { name: 'Security Code' }).fill('123');
// await innerFrame.getByRole('textbox', { name: 'Postal Code' }).fill('HP2 4YL');
// //Confirm & Complete Payment Button
//  // Get the outer iframe
// const outerFrameElement1 = page.locator(
//   'iframe[title="Missing translation \\"reservations.payment-info.cc.iframe\\" for locale \\"en\\""]'
// );
// const outerFrame1 = await outerFrameElement.contentFrame();

// Click the final "done" button
// await outerFrame1.getByRole('button', { name: 'Confirm & Complete Payment' }).click();
// Locate the outer iframe once and get its frame

const paymentsection = new Payment(page);// create an instance of the Payment class and pass the page object to it
await paymentsection.fillcarddetails(data.cardnumber, data.expirydate, data.cvv, data.postalcode);// fill in card details and complete the payment using the fillcarddetails method of the Payment class with the provided card details from the dataset
//const outerFrameElement = page.locator(
  //'iframe[title="Missing translation \\"reservations.payment-info.cc.iframe\\" for locale \\"en\\""]');
//await outerFrameElement.waitFor(); // ensure iframe is loaded
//const outerFrame = await outerFrameElement.contentFrame();

// Locate the inner iframe inside the outer frame
//const innerFrameElement = outerFrame.locator('iframe[title="Payment iframe"]');
//await innerFrameElement.waitFor(); // ensure iframe is loaded
///const innerFrame = await innerFrameElement.contentFrame();

// Fill in payment form fields
//await innerFrame.getByRole('textbox', { name: 'Card Number' }).fill('4012000033330026');
//await innerFrame.getByRole('textbox', { name: 'Expiration Date' }).fill('0434');
//await innerFrame.getByRole('textbox', { name: 'Security Code' }).fill('123');
//await innerFrame.getByRole('textbox', { name: 'Postal Code' }).fill('HP2 4YL');

// Click the final "Confirm & Complete Payment" button in the outer frame
//await outerFrame.getByRole('button', { name: 'Confirm & Complete Payment' }).click();

//await innerFrame.getByRole('textbox', { name: 'Confirm & Complete Payment' }).click();
await page.screenshot({ path: 'Booking-Confirmation.png' });// take a screenshot of the payment page and save it as 'payment-page.png'
await page.locator("(//div[@class='l-details']//span)[1]").screenshot({ path: 'reservation-id.png' });
const reservationId = await page.locator("(//div[@class='l-details']//span)[1]").textContent();
console.log('Reservation ID:', reservationId); // output: Reservation ID: 12345

//await page.pause();

});
  }
//await page.locator('iframe[title="Missing translation \\"reservations.payment-info.cc.iframe\\" for locale \\"en\\""]').contentFrame().getByRole('button', { name: 'Confirm & Complete Payment' }).click();