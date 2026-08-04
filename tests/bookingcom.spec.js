import{ test, expect } from '@playwright/test';

test('Booking.com ',async({page})=> {
    await page.goto('https://www.booking.com');

    await page.waitForTimeout(3000); 
    
    // Press 'Escape' key as a universal popup closer
    await page.keyboard.press('Escape');
    //searchbox-horizontal-destination-input
    await page.getByPlaceholder('Where are you going?').click();
    const suggestionList = await page.getByRole('option').allInnerTexts();
    console.log (" Suggestion list:" + suggestionList);
    const selectfirstoption = await page.getByRole('option').nth(0); // chennai
    await selectfirstoption.click();
    
    // // Check-in date
    // const checkindate = page.getByRole('checkbox', { name: '10 August 2026' });
    // await checkindate.click();

    // // Checkout date
    // const checkoutdate = page.getByRole('checkbox', { name: '11 August 2026' });
    // await checkoutdate.click();

    // Check-in date: 10 August 2026
    await page.locator('span[data-date="2026-08-10"]').click();

    // Check-out date: 11 August 2026
    await page.locator('span[data-date="2026-08-11"]').click();

    // select occupancy 
    await page.locator("[data-testid='occupancy-config']").click();
    // Target the + button immediately following the rooms input value display
    const addRoomButton = page.locator('#no_rooms ~ button').nth(1);
    await addRoomButton.click();

    // click search
    await page.getByRole('button', { name: 'Search' }).click();
    await page.waitForTimeout(3000); 

    // print top 10 search list 
    const Hotelnamelist = await page.locator("[data-testid='title-link']").allInnerTexts();
    console.log ("Top 10 Hotel list");
    for(let i=0; i<10; i++){
        if(Hotelnamelist[i]){
            console.log((i+1) + ":" + Hotelnamelist[i]);
        }
    }
    await page.pause();

});