const actions = require("@actions/core");
const chromeLauncher = require("chrome-launcher");
const lighthouse = require("lighthouse");
const { computeMedianRun } = require("lighthouse/lighthouse-core/lib/median-run");
const mobileConfig = require("lighthouse/lighthouse-core/config/lr-mobile-config");
const desktopConfig = require("lighthouse/lighthouse-core/config/lr-desktop-config");
const { applicationBasePath } = require("../../constants/basePath");

const TEST_URL = `http://localhost:3000${applicationBasePath}?search=maths`;
const ITERATIONS = 5;
const MINIMUM_DESKTOP_SCORE = 90;
const MINIMUM_MOBILE_SCORE = 85;

(async () => {
    const isMobileReport = process.argv.includes("--mobile");
    const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });

    const options = {
        logLevel: "info",
        output: "html",
        onlyCategories: ["performance"],
        port: chrome.port,
    };

    const config = isMobileReport ? mobileConfig : desktopConfig;
    const threshold = isMobileReport ? MINIMUM_MOBILE_SCORE : MINIMUM_DESKTOP_SCORE;

    const results = [];

    for (let i = 0; i < ITERATIONS; i++) {
        // eslint-disable-next-line no-await-in-loop
        const result = await lighthouse(TEST_URL, options, config);

        results.push(result.lhr);
    }

    const median = computeMedianRun(results);
    const performanceScore = median.categories.performance.score * 100;

    await chrome.kill();

    if (performanceScore >= threshold) {
        actions.info(`Median performance score: ${performanceScore}`);
    } else {
        actions.setFailed(
            `Median performance score of ${performanceScore} is less than the minimum threshold of ${threshold}`
        );
    }
})();
