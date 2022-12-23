@payments
Feature: Testing utrust payments

  Scenario: Verify if New Invoice is created successfully
    Given I am navigated to the payments page
    When I create a new invoice
    Then I should be able to validate that the invoice is created successfully