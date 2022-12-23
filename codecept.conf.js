const aggregatedData = require('./config/aggregate')(process.profile);

exports.config = {
    tests: './*_test.ts',
    grep: aggregatedData.grep,
    output: './output',
    timeout: 5000,
    helpers: {
        Playwright: aggregatedData.playwright,
        AssertWrapper: {
            require: "codeceptjs-assert",
        },
        },
        name: "e2e",
        mocha: {},
        include: aggregatedData.include,
        gherkin: {
        features: "./tests/features/**/*.feature",
        steps: aggregatedData.steps,
        },
        plugins: {
        screenshotOnFail: {
            enabled: true,
        },
        pauseOnFail: {},
        retryFailedStep: {
            enabled: true,
        },
        tryTo: {
            enabled: true,
        },
        allure: {
            enabled: true,
        },
        retryFailedStep: {
            enabled: true,
            retries: 5,
        },
    },
}
