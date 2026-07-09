import {test ,expect} from '@playwright/test';

test('Amazonpagetest',async ({page}) => {

    await page.goto('https://www.amazon.in/');
    await page.getByRole('button',{name:'Continue shopping'}).click();
    
    await expect(page.getByText('Returns & Orders')).toBeVisible();
    await page.getByRole('link', { name: 'Returns & Orders' }).click();

    await page.pause();


})