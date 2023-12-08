module.exports = {
    // Specify the path to your unit tests
    testRegex: "tests/unit/.*\\.test\\.js$",

    // Use Babel to transform your files
    transform: {
        "^.+\\.(js|jsx)$": "babel-jest",
    },

    // Automatically clear mock calls and instances between every test
    clearMocks: true,

    // An array of regexp pattern strings used to skip coverage collection
    coveragePathIgnorePatterns: ["/node_modules/"],

    // Indicates whether each individual test should be reported during the run
    verbose: true,

    // Setup Environments
    testEnvironment: "node",

    // Setup for handling module imports
    moduleNameMapper: {
        // Add mappings if you're using aliases or specific module paths
    },
};
