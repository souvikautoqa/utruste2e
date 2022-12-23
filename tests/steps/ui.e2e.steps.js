const { I, loginPage, rightNav, paymentsPage, emailPage, utils, paymentLinkPage} = inject();
  
  Given("I am navigated to the payments page", async () => {
    await loginPage.performLogin();
    await rightNav.navToPayments();
  });

  When("I create a new invoice", async() => {
    await paymentsPage.createNewInvoice();
  })
  
  Then("I should be able to validate that the invoice is created successfully", async () => {
    await paymentLinkPage.verifyDetails();
    await emailPage.verifyEmailReached();
  });