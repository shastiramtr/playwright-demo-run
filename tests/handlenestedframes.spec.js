import {test,expect} from '@playwright/test';

test('Handle Nested Frames',async ({page}) =>{

    await page.goto('https://the-internet.herokuapp.com/nested_frames');

    const outerframe =page.frameLocator('frame[name="frame-top"]');
    // how many frames are there in the outer frame
    const frameCount = await outerframe.locator('frame').count();
    console.log("Number of frames in the outer frame:"+ frameCount);

    // LEFT FRAME

    const leftframe = outerframe.frameLocator('frame[name="frame-left"]');
    await expect(leftframe.locator('body')).toHaveText('LEFT');
    // get the text from the left frame and print it to the console
    const leftText = await leftframe.locator('body').textContent();
    console.log("Text in the left frame: " + leftText);

    // MIDDLE FRAME

    const middleframe = outerframe.frameLocator('frame[name="frame-middle"]');
    await expect(middleframe.locator('#content')).toHaveText('MIDDLE');
    // Get the text from the middle frame and print it to the console
    const middleText = await middleframe.locator('#content').textContent();
    console.log("Text in the middle frame: " + middleText);   

    // RIGHT FRAME

    const rightframe = outerframe.frameLocator('frame[name="frame-right"]');
    await expect(rightframe.locator('body')).toHaveText('RIGHT');
    // Get the text from the right frame and print it to the console
    const rightText = await rightframe.locator('body').textContent();
    console.log("Text in the right frame: " + rightText);

    // BOTTOM FRAME

    const bottomframe = page.frameLocator('frame[name="frame-bottom"]');
    await expect(bottomframe.locator('body')).toHaveText('BOTTOM');
    // how many frames are there in the bottom frame
    const bottomframecount = await bottomframe.locator('body').count();
    console.log("Number of frames in the bottom frame:"+ bottomframecount);
    
    // Get the text from the bottom frame and print it to the console
    const bottomText = await bottomframe.locator('body').textContent();
    console.log("Text in the bottom frame: " + bottomText);

});
