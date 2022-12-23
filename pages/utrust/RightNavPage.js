const { I, utils } = inject();

module.exports = {
    elements : {
        payments: { xpath : ".//a[@data-test='payments/orders-sidebarLink']" },
    },
    async navToPayments() {
        await I.click(this.elements.payments);
        await utils.waitForUrlToUpdate('/payments/orders', 5);        
    }
}
