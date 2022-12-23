# Setup

`npm install`

# How to use

## How to start tests

`npm run e2e {env}:{tag}:{browserProfile}`

`example: npm run e2e stage:payments:chrome`

or run all testcase with

`npm run e2e stage`

# How to write tests

## Test files

Writing a new test for UTRUST requires you create at least 3 files:

- A feature file. The feature file contains the test tag and the test scenario written in BDD format.
- A steps file. The steps file will be used to glue the BDD sentences to Page object actions
- At least a page file. The page files contain the locators and actions per each app page they're describing

### The feature file (BDD)

The feature file should be stored under the `e2e/tests` folder, the aggregate scanner will pick it up from there

- it should contain a tag (if you do not provide a tag, the test cannot be run isolated)

- it should respect [Gherkin](https://cucumber.io/docs/gherkin/) syntax

- it should have the `.feature` extension, else framework will not find it!

### The steps file (glue code)

The steps file should be stored under the `e2e/tests` folder, the aggregate scanner will pick it up from there

- it should import the `I` actor, page objects and environment objects `envUris` and `envData` to use within the test

- it should contain glue code for all the sentences in the related .feature file

- it should have the `.e2e.steps.ts` extension, else framework will not find it!

### Answer to the questions

- Q: We want to run this scenario automatically and frequently. What process/setup/tools would you choose to achieve this?
  - A: I have created 2 GitHub actions worklow one for hourly build and other for manual run

- Q: On step 5, the system is supposed to send an email. How would you check if the email was really received to the email address?
  - A: I am creatign a temp email address before the test run and validating if the invoice email reaches to the same address

- Q: How would you test the same scenario on different screen sizes?
  - A: I should be able to achieve this with a configuration change to load the browser with a specific dimension and then update the test to cater to the mobile view. I have not
     implemented this here in the framework as I am going for vacation tomorrow so I have to pack :D