class Payment {
    constructor(page){
        this.page = page;
        this.outerFrameElement = page.locator(
  'iframe[title="Missing translation \\"reservations.payment-info.cc.iframe\\" for locale \\"en\\""]');
      }
    async fillcarddetails(cardnumber, expirydate, cvv, postalcode){
        
        //wait for the outer iframe to load and get its content frame
        await this.outerFrameElement.waitFor(); // ensure iframe is loaded
        const outerFrame = await this.outerFrameElement.contentFrame();
        
        //wait for the inner iframe to load and get its content frame
        const innerFrameElement = outerFrame.locator('iframe[title="Payment iframe"]');
        await innerFrameElement.waitFor(); // ensure iframe is loaded
        const innerFrame = await innerFrameElement.contentFrame();

        // Fill in payment form fields
        await innerFrame.getByRole('textbox', { name: 'Card Number' }).fill(cardnumber);
        await innerFrame.getByRole('textbox', { name: 'Expiration Date' }).fill(expirydate);
        await innerFrame.getByRole('textbox', { name: 'Security Code' }).fill(cvv);
        await innerFrame.getByRole('textbox', { name: 'Postal Code' }).fill(postalcode);

        // Click the final "Confirm & Complete Payment" button in the outer frame
        await outerFrame.getByRole('button', { name: 'Confirm & Complete Payment' }).click();
    }
}

module.exports = {Payment};// export the Payment class to be used in other test files