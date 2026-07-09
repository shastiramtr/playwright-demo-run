const {test, expect, request} = require('@playwright/test');

const loginPayload = {userEmail: "shastiram@gmail.com", userPassword: "Login@123"};
let token;

test.beforeAll(async () => {
    const apicontext = await request.newContext();
    const loginresponce = await apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
        data: loginPayload,
    }); // 200,201,202
    expect(loginresponce.ok()).toBeTruthy();
    const loginresponsejson = await loginresponce.json();
    token = loginresponsejson.token;
    console.log(token);
});

test.beforeEach(() => {
});


test('Client App login', async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);
    const email = loginPayload.userEmail;
   
//    await page.goto("https://rahulshettyacademy.com/client");
//    await page.locator("#userEmail").fill(email);
//    await page.locator("#userPassword").fill("Login@123");
//    await page.locator("[value='Login']").click();
//    await page.waitForLoadState('networkidle');
    const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles); 
   const count = await products.count();
   for (let i = 0; i < count; ++i) {
      if (await products.nth(i).locator("b").textContent() === productName) {
         //add to cart
         await products.nth(i).locator("text= Add To Cart").click();
         break;
      }
   }
 
   await page.locator("[routerlink*='cart']").click();
   //await page.pause();
 
   await page.locator("div li").first().waitFor();
   const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();// check if the added product is visible in the cart
   expect(bool).toBeTruthy();// assert that the product is visible in the cart
   await page.locator("text=Checkout").click(); // click on checkout button
 
   await page.getByPlaceholder('Select Country').type("ind", { delay: 150 });
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }
 
   await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);
 
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
 
});