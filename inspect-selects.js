const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  await page.fill('#userEmail', 'shastiram@gmail.com');
  await page.fill('#userPassword', 'Login@123');
  await page.click("[value='Login']");
  await page.waitForLoadState('networkidle');
  await page.click(".card-body:has-text('ZARA COAT 3') >> text=Add To Cart");
  await page.click("[routerlink*='cart']");
  await page.waitForSelector('text=Checkout', {timeout:20000});
  await page.click('text=Checkout');
  const selects = page.locator('select.input.ddl');
  const count = await selects.count();
  console.log('select count=', count);
  for (let i = 0; i < count; i++) {
    const html = await selects.nth(i).evaluate(el => el.outerHTML);
    const values = await selects.nth(i).evaluate(el => Array.from(el.options).map(o => o.value));
    console.log('select', i, 'html=', html);
    console.log('select', i, 'values=', values.slice(0, 20), '... total', values.length);
  }
  await browser.close();
})();
