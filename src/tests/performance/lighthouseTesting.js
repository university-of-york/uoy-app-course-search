const actions = require("@actions/core");
const average = require("lodash.mean");
const chromeLauncher = require("chrome-launcher");
const lighthouse = require("lighthouse");
const mobileConfig = require("lighthouse/lighthouse-core/config/lr-mobile-config");
const desktopConfig = require("lighthouse/lighthouse-core/config/lr-desktop-config");

const TEST_URL = "http://localhost:3000?search=maths";
const ITERATIONS = 5;
const MINIMUM_DESKTOP_SCORE = 90;
const MINIMUM_MOBILE_SCORE = 80;

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

    let scores = [];

    for (let i = 0; i < ITERATIONS; i++) {
        const result = await lighthouse(TEST_URL, options, config);

        scores.push(result.lhr.categories.performance.score * 100);
    }

    const averagePerformanceScore = average(scores);

    console.log(scores);

    await chrome.kill();

    if (averagePerformanceScore >= threshold) {
        actions.info(`Average performance score: ${averagePerformanceScore}`);
    } else {
        actions.setFailed(
            `Average performance score of ${averagePerformanceScore} is less than the minimum threshold of ${threshold}`
        );
    }
})();
