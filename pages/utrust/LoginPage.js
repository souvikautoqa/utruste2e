const { I, envUris, utils } = inject();

module.exports = {
    elements : {
        email: { id : "email" },
        password: { id : "password" },
        btnSignIn: { xpath : ".//button[@name='sign-in']" },
    },
    async performLogin() {
        await I.amOnPage(envUris.utrustUrl);
        await I.fillField(this.elements.email, envUris.utrustUser);
        await I.fillField(this.elements.password, envUris.utrustPassword);
        await I.click(this.elements.btnSignIn);
        await utils.waitForUrlToUpdate('/onboarding/get-started', 5);        
    }
}
