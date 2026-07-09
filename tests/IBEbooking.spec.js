const{test,expect} = require('@playwright/test');// import the test and expect functions from the @playwright/test module to write and run tests
const { stat } = require('node:fs');// import the stat function from the node:fs module to work with file system operations
const {LoginPage} = require('../pageobjects/Loginpage');// import the LoginPage class from the pageobjects/Loginpage.js file
const {selectProductWithPrice} = require('../pageobjects/selectProductWithPrice');// import the selectProductWithPrice class from the pageobjects/selectProductWithPrice.js file
const {Payment} = require('../pageobjects/Payment');// import the Payment class from the pageobjects/Payment.js file
const dataset = JSON.parse(JSON.stringify(require("../utils/Testdata.json")));// import test data from the Testdata.json file and parse it as a JavaScript object to use in the test

for(const data of dataset)
{
    
test (`IBEbooking with ${data.productName} and ${data.priceType} price`,async({page}) => // define a test case named 'IBEbooking' that takes a page object as an argument to interact with the web page
    {
    // extend timeout for this test
  test.setTimeout(120000);// set the timeout for this test to 120 seconds (2 minutes) to allow for longer operations such as page loading and form filling
     
     const loginpage = new LoginPage(page);// create an instance of the LoginPage class and pass the page object to it
     loginpage.goto();// navigate to the login page using the goto method of the LoginPage class

     // Select product and price
     await selectProductWithPrice(page, data.productName, data.priceType);

     // Handle bed configuration dropdown if it appears
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

     await page.getByRole('button', { name: 'Continue' }).first().click();// click on Summary continue button to proceed to Addon page
     
     //Treat Yourself page - Skip Addon selection - click continue to proceed to login page
     await page.getByRole('button', { name: 'Skip Addons' }).click();// click on skip addons button to proceed to login page
     
     // Perform login action using the validlogin method of the LoginPage class with the provided email and password
     // Step 1. Guest information *
     
     await loginpage.validlogin(data.email, data.password);// perform a valid login using the validlogin method of the LoginPage class with the provided email and password
     
     await page.waitForTimeout(5000);// wait for 5 seconds
     await page.getByRole('button', { name: 'Continue' }).click();// click on continue button to proceed to payment page
     
     //Step 2. Billing information * - Accept terms and conditions and proceed to payment
     await page.locator('.terms-and-conditions__accept').check();// check the terms and conditions checkbox to accept the terms before proceeding to payment
     await page.getByRole('button', { name: 'Continue' }).click();// click on continue button to proceed to payment page
     
     // Step 3. Payment - Fill in card details and complete the payment
     // Wait for the outer iframe to load and get its content frame
     const paymentsection = new Payment(page);
     await paymentsection.fillcarddetails(data.cardnumber, data.expirydate, data.cvv, data.postalcode);
     
     //Booking Confirmation - Capture reservation ID and take screenshot
     await page.screenshot({ path: 'Booking-Confirmation.png' });// take a screenshot of the payment page and save it as 'Booking-Confirmation.png'
     await page.locator("(//div[@class='l-details']//span)[1]").screenshot({ path: 'reservation-id.png' });
     const reservationId = await page.locator("(//div[@class='l-details']//span)[1]").textContent();
     console.log('Reservation ID:', reservationId); // output: Reservation ID: 12345
});// end of the test case definition for 'IBEbooking'
}
