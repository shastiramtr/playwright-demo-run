const { test, expect } = require('@playwright/test');

test('Validate multiple links in new tabs', async ({ page, context }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

  const links = page.locator('#gf-BIG li a');
  const count = await links.count();

  console.log('Total links in the footer section: ' + count);

  for (let i = 0; i < count; i++) {
    const href = await links.nth(i).getAttribute('href');

    if (!href || href === '#' || href.startsWith('javascript')) {
      continue;
    }

    const url = new URL(href, page.url()).toString();

    const newPage = await context.newPage();

    await newPage.goto(url);

    console.log('Title of the page: ' + await newPage.title());

    await newPage.close();
  }

  await page.bringToFront();
});