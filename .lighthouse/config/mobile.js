module.exports = {
    extends: "lighthouse:default",
    settings: {
        maxWaitForLoad: 35 * 1000,
        emulatedFormFactor: "mobile",
    },
};
