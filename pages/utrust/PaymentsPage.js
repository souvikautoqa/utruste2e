const { I, utils, emailPage, envData } = inject();
const { state } = require("../../helpers/sceanrioState");

module.exports = {
    elements : {
        tabInvoices: { xpath : ".//a[text()='Invoices']" },
        btnNewInvoice: { xpath : "(.//button[@data-test='button-new-invoice'])[1]" },
        txtName: { id : "customerName" },
        txtEmail: { id : "customerEmail" },
        txtBillingAddress: { id : "billingAddress" },
        txtCity: { id : "city" },
        txtPostcode: { id : "postCode" },
        selectCountry: { id : "downshift-5-input" },
        selectCurrency: { id : "downshift-4-input" },
        txtAmount: { id : "amount" },
        btnGenInvoice: { id : "generate-invoice-button" },
        btnGenInvoiceAgain: { xpath : ".//button[@data-test='submit-new-invoice-button']" },
        btnGenInvoiceOk: { xpath : ".//button[@data-test='invoice-sent-ok']" },
        optionCountryCurrency :  ".//div[contains(text(),'@@replace')]",
        btnCopyPaymentAddress: { xpath : ".//button[@aria-label='You can click on this button to copy automatically the value to your clipboard']"}
    },
    async createNewInvoice() {
        await I.click(this.elements.tabInvoices);
        await I.click(this.elements.btnNewInvoice);
        await utils.waitForUrlToUpdate('/payments/invoices/new', 5); 
        const email = await emailPage.getTempEmail();

        await I.closeOtherTabs();
        await I.fillField(this.elements.txtName, envData.NewInvoice.UserData.name);
        await I.fillField(this.elements.txtEmail, email);
        await I.fillField(this.elements.txtBillingAddress, envData.NewInvoice.UserData.billingAddress);
        await I.fillField(this.elements.txtCity, envData.NewInvoice.UserData.city);
        await I.fillField(this.elements.txtPostcode, envData.NewInvoice.UserData.postcode);
        await I.fillField(this.elements.selectCountry, envData.NewInvoice.UserData.country);

        const country = this.elements.optionCountryCurrency.replace("@@replace",envData.NewInvoice.UserData.country);    
        await I.click({ xpath: country });
        await I.fillField(this.elements.selectCurrency, envData.NewInvoice.UserData.currency);
        const currency = this.elements.optionCountryCurrency.replace("@@replace",envData.NewInvoice.UserData.currency); 
        await I.click({ xpath: currency });
        await I.fillField(this.elements.txtAmount, envData.NewInvoice.UserData.amount);
        await I.click(this.elements.btnGenInvoice);
        await I.click(this.elements.btnGenInvoiceAgain);
        await I.click(this.elements.btnGenInvoiceOk);
        await I.click(this.elements.btnCopyPaymentAddress);
        const readFrom = new (require('readfrom'))();
        state.data = { paymentLink : await readFrom.clipboard()};
    }
}
