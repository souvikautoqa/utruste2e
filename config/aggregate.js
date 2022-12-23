const fs = require("fs");
const baseIncludes = require("./pageIncludes");

const testsPath = "./tests";
const configsPath = "./config";

const testDataConfig = /^test.config.(.*).js$/;
const uriConfigMatch = /^config.(.*).js$/;
const stepFileMatch = /(.*)\.e2e.steps\.js/;

function log(message) {
  console.log(`[INFO] ${message}`);
}

const scanStepFiles = (dir, matcher) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const currentFile = `${dir}/${file}`;
    const stat = fs.statSync(currentFile);
    if (stat && stat.isDirectory()) {
      results = results.concat(scanStepFiles(currentFile, matcher));
    } else {
      const match = matcher.test(currentFile);
      if (match) {
        results.push(currentFile);
      }
    }
  });
  return results;
};

function parseProfile(profile) {
  const splitArgs = profile.split(":");
  return {
    env: splitArgs[0],
    grepCommand: splitArgs[1],
    browser: splitArgs[2],
  };
}

function makeDataConfigObj(fileList, testMatch, uriMatch) {
  const configFiles = { uri: [], testData: [] };

  fileList.forEach((file) => {
    const isUriConfig = file.match(uriMatch);
    const isTestDataConfig = file.match(testMatch);

    if (isUriConfig) {
      configFiles.uri.push({
        fileName: isUriConfig[0],
        match: isUriConfig[1],
      });
    }

    if (isTestDataConfig) {
      configFiles.testData.push({
        fileName: isTestDataConfig[0],
        match: isTestDataConfig[1],
      });
    }
  });

  return configFiles;
}

function selectDesired(list, desired, path) {
  const available = list.map((item) => {
    return item.match;
  });

  const selected = list.find((item) => {
    return item.match === desired;
  });

  if (!selected) {
    throw new Error(`${desired} was not found, options are ${available}`);
  }

  return `${path}/${selected.fileName}`;
}

function browserProfile(){
  const chrome = {
    url: 'https://',
      show: true,
      browser:'chromium',
      channel:'chrome',          
      timeout: 10000,     
      waitForAction: 1000,
      waitForTimeout:5000,
      restart: false,
      keepBrowserState: false,
      trace: false,
      video: false,
      windowSize: "1280x720"
  }
  return chrome;
}

function aggregate(testString) {

  //const defaultTestString = "stage:streams:api";
  
  const defaultTestString = "stage:testingabi:api";

  // parse the string passed in the --profile arg
  const argsObject = parseProfile(testString || defaultTestString);

  // read the test folder for steps and the config folder for configs
  const stepsFiles = scanStepFiles(testsPath, stepFileMatch);
  log(`Read tests folder: ${stepsFiles.length} step files found`);
  const allConfigFiles = fs.readdirSync(configsPath, "utf-8");
  log(`Read config folder: ${allConfigFiles.length} config files found`);

  // filter out the required config files and store them in a neat lil' object
  const parsedConfigFiles = makeDataConfigObj(
    allConfigFiles,
    testDataConfig,
    uriConfigMatch
  );

  // select what files contain the data the environment requires
  const selectedEnv = selectDesired(
    parsedConfigFiles.uri,
    argsObject.env,
    configsPath
  );
  const envUserData = selectDesired(
    parsedConfigFiles.testData,
    argsObject.env,
    configsPath
  );

  const playwrightConfig = browserProfile();

  // include the envUris and envUsers objects that can be accessed to return env specific data
  baseIncludes.include.envUris = selectedEnv;
  log(
    `Loading env config ${selectedEnv}, accessible in the tests as 'envUris'`
  );
  baseIncludes.include.envData = envUserData;
  log(
    `Loading user and program data config ${envUserData}, accessible in the tests as 'envData'`
  );

  log(`Included ${stepsFiles.length} steps files in the config`);

  let testsRunning = "ALL";
  if (!testString) {
    testsRunning = "NO";
  } else if (argsObject.grepCommand) {
    testsRunning = argsObject.grepCommand;
  }

  log(
    `Running "${testsRunning}" tests on the "${argsObject.env}" environment on the "${argsObject.browser}" browser...`
  );

  const finalConfig = {
    include: baseIncludes.include,
    grep: argsObject.grepCommand,
    steps: stepsFiles,
  }
 
  if(argsObject.browser === 'api'){
    finalConfig.playwright = {}
  }else if(argsObject.browser === 'chrome'){
    finalConfig.playwright = playwrightConfig;
  }
  return finalConfig;
}

module.exports = aggregate;
