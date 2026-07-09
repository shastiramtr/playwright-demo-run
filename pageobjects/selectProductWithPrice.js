const { expect } = require('@playwright/test');// import the expect function from the @playwright/test module to write assertions in the test

async function selectProductWithPrice(page, productName, priceType) {// define an asynchronous function named selectProductWithPrice that takes a page object, product name, and price type as arguments to select a product with the specified price type on the web page
  // Step 1: Click the corresponding "View Prices" button
  const productIndexMap = {// create a mapping of product names to their corresponding index for the "View Prices" buttons
    "Garden Chalet": 0,// index for the "Standard" product
    "Standard": 1,// index for the "Garden Chalet" product
    "Signature": 2,// index for the "Signature" product
    "Royale": 3,// index for the "Royale" product
  };// end of the product index mapping
  await page.getByRole('button', { name: 'View Prices' }).nth(productIndexMap[productName]).click();// click on the "View Prices" button corresponding to the specified product name

  // Step 2: Assert and click the "Select" button for the chosen price type
  const priceIndexMap = {// create a mapping of price types to their corresponding index for the "Select" buttons
    "Flexible": 0,// index for the "Flexible" price type
    "Standard": 1,// index for the "Standard" price type
    "Saver": 2,// index for the "Saver" price type
  };// end of the price index mapping

  const selectButton = page.getByRole('button', { name: 'Select' }).nth(priceIndexMap[priceType]);// locate the "Select" button corresponding to the specified price type
  const buttonText = await selectButton.textContent();// get the text content of the located "Select" button
  expect(buttonText?.trim()).toBe("Select");// assert that the text content of the button is "Select" after trimming any whitespace

  await selectButton.click();// click on the located "Select" button to choose the product with the specified price type


  // Step 3: Click the "Continue" button to proceed to the next step
  //await page.getByRole('button', { name: 'Continue' }).first().click();// click on Summary continue button to proceed to Addon page

}// end of the selectProductWithPrice function

module.exports = { selectProductWithPrice };// export the selectProductWithPrice function to be used in other test files
