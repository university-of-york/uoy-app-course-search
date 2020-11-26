module.exports = {
    extends: "lighthouse:default",
    settings: {
        maxWaitForLoad: 35 * 1000,
        emulatedFormFactor: "desktop",
        throttling: {
            rttMs: 40,
            throughputKbps: 10 * 1024,
            cpuSlowdownMultiplier: 1,
        },
    },
};
