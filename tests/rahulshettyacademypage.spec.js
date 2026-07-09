const {test,expect} = require('@playwright/test');


test ('@Web Client App login',async ({page}) => {
    // js file - login  js, DashboardPage
    const email ="shastiram@gmail.com"; //  valid email and password for login
    const password = "Login@123"; // valid email and password for login
    const productName = "ZARA COAT 3"; // product name to be added in the cart
    const product = page.locator(".card-body");
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');    
    await console.log(await page.title()); // output: Login - Rahulshetty Academy
    await page.getByPlaceholder('email@example.com').fill(email); 
    await page.getByPlaceholder('enter your passsword').fill(password); // fill the email and password fields
    await page.getByRole('button', { name: 'Login' }).click(); // click on login button
    await page.waitForLoadState('networkidle'); // wait for the page to load completely
    await page.locator(".card-body b").first().waitFor(); // wait for the first product to be visible
    // const productNames = await page.locator(".card-body b").allTextContents(); // get all product names as an array
    // console.log(productNames);
    // const count = await product.count(); // get the count of products displayed on the page
    // for(let i =0; i <count; ++i) { // loop through each product
    //     if (await product.nth(i).locator("b").textContent() === productName) { // check if the product name matches the desired product
    //         // add to card
    //         await product.nth(i).locator("text= Add To Cart").click(); // click on add to cart button
    //         break; // exit the loop once the product is found and added to cart
    //     }
    // }
    // Refactored code using filter method to select the desired product and add to cart
    await page.locator(".card-body").filter({ hasText: "ZARA COAT 3" }).getByRole("button", { name: " Add To Cart" }).click(); // filter the products by name and click on add to cart button for the matching product
    await page.locator("[routerlink*='cart']").click(); // click on cart link to navigate to cart page
    await page.locator("div li").first().waitFor(); // wait for the first item in the cart to be visible
    const isProductVisible = await page.locator("h3:has-text('ZARA COAT 3')").isVisible(); // check if the added product is visible in the cart
    expect(isProductVisible).toBeTruthy(); // assert that the product is visible in the cart
    await page.locator("text=Checkout").click(); // click on checkout button
    //Handling Auto suggestive dropdowns option with Playwright - Example: Country selection in checkout page
    await page.getByPlaceholder('Select Country').fill("ind"); // type 'ind' in the country input field to trigger the auto-suggest dropdown
    const dropdown = await page.locator(".ta-results"); // wait for the auto-suggest dropdown to appear
    await dropdown.waitFor(); // wait for the dropdown to be visible
    const optionsCount = await dropdown.locator("button").count(); // get the count of options in the dropdown
    for(let i=0; i<optionsCount; ++i) { // loop through each option in the dropdown
        const optionText = await dropdown.locator("button").nth(i).textContent(); // get the text content of the current option 
        if (optionText.trim() === "India") { // check if the option text matches 'India'
            await dropdown.locator("button").nth(i).click(); // click on the matching option to select it
            break; // exit the loop once the desired option is found and selected
        }
    }
        // add assertion to verify that the correct email used for login
        //expect (page.locator(".user__name [type='text']")).toHaveValue(email); // assert that the email used for login is displayed in the user profile section
        
        //Personal Information
        //Expiry Date Select options
        //await page.locator("(//select[@class='input ddl'])[1]").selectOption("02"); // select the expiry month
        //await page.locator("(//select[@class='input ddl'])[2]").selectOption("2025"); // select the expiry year
        //CVV Code ?
        //await page.locator(".input txt").fill(123);// fill the CVV code in the input field
        //await page.locator("(//input[@class='input txt'])[1]").fill("123"); // fill the CVV code in the input field using XPath selector
        //await page.locator("(//input[@class='input txt'])[2]").fill("shastiram"); // fill the card number in the input field using XPath selector
        await page.locator(".action__submit").click(); // click on the submit button
        await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. "); // assert that the order confirmation message is displayed after successful checkout
        const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent(); // get the order ID from the confirmation page
        console.log(orderId); // output: Order ID: 12345
        
        //await page.pause(); // pause the test execution to inspect the page after checkout


    //await page.pause(); // pause the test execution to inspect the page after adding the product to cart

});