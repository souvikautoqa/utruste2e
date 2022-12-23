const { I, envData, utils } = inject();
const { state } = require("../../helpers/sceanrioState");
const assert = require("assert");

module.exports = {
    elements : {
        storeName: { xpath : ".//span[contains(@class,'Details_storeName')]" },
        totalFiat: { xpath : ".//div[contains(@class,'Details_totalFiat')]" },
    },
    async verifyDetails() {
        await I.openNewTab();
        await utils.switchToNextAvailableTab();
        await I.amOnPage(state.data.paymentLink);
        assert.equal(
            await I.grabTextFrom(this.elements.storeName),
            envData.NewInvoice.UserData.merchant,
            `Merchant Info Not Displayed Correctly`
          );
        assert.equal(
            await I.grabTextFrom(this.elements.totalFiat),
            `€ ${envData.NewInvoice.UserData.amount}`,
            `Total fiat value Not Displayed Correctly`
        );
        await I.switchToPreviousTab();
        await I.closeOtherTabs();      
    }
}
