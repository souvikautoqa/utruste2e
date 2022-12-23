const { I, envUris, utils } = inject();
const assert = require("assert");

module.exports = {
    elements : {
       // emailTrash: { id: "trsh_mail" },
        emailTrash: { id: "emailAddress" },
        emailCopy: { xpath: ".//button[@data-original-title='Click To Copy!']" },
        //emailConfirmation: { xpath: ".//div[@class='message-item']//a[text()='Invoice to pay from Utrust Merchant']" }
        emailConfirmation: { xpath: ".//div[@class='row metaRow']/div[text()='Invoice to pay from Utrust Merchant']" }
    },
    async getTempEmail() {
        await I.openNewTab();
        await utils.switchToNextAvailableTab();
        await I.amOnPage(envUris.trashMail);
        await utils.sleep(2000);
        // await I.click(this.elements.emailCopy);
        // const readFrom = new (require('readfrom'))();
        // await I.switchToPreviousTab();
        // return await readFrom.clipboard();
        const email = await I.grabTextFrom(this.elements.emailTrash);
        await I.switchToPreviousTab();
        return email;
        
    },
    async verifyEmailReached(){
        await I.openNewTab();
        await utils.switchToNextAvailableTab();
        await I.amOnPage(envUris.trashMail);
        await I.wait(2);
        assert.equal(await utils.isVisible(this.elements.emailConfirmation),true,'Invoice Email not reached');       
    }
}

