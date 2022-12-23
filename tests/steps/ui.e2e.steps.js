const { I, loginPage, rightNav, paymentsPage, emailPage, utils} = inject();
const assert = require("assert");
  
  Given("I am navigated to the payments page", async () => {
    await loginPage.performLogin();
    await rightNav.navToPayments();
  });

  When("I create a new invoice", async() => {
    await paymentsPage.createNewInvoice();
  })
  
  Then("I should be able to validate that the invoice is created successfully", async () => {
    console.log('I should be able to validate that the invoice is created successfully')
  });