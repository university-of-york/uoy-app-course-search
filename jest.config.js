module.exports = {
    testMatch: ["<rootDir>/src/**/*.test.js"],
    setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    },
};
