const { I, envUris, utils } = inject();

module.exports = {
    elements : {
        emailTrash: { id: "trsh_mail" },
        emailCopy: { xpath: ".//button[@data-original-title='Click To Copy!']" }
    },
    async getTempEmail() {
        await I.openNewTab();
        await utils.switchToNextAvailableTab();
        await I.amOnPage(envUris.trashMail);
        await utils.sleep(2000);
        await I.click(this.elements.emailCopy);
        const readFrom = new (require('readfrom'))();
        await I.switchToPreviousTab();
        return await readFrom.clipboard();;
    }
}

