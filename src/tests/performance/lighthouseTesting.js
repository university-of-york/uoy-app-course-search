const actions = require("@actions/core");
const average = require("lodash.mean");
const chromeLauncher = require("chrome-launcher");
const lighthouse = require("lighthouse");

const TEST_URL = "http://localhost:3000?search=maths";
const ITERATIONS = 3;
const MINIMUM_ACCEPTABLE_SCORE = 90;

(async () => {
    const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });

    const options = {
        logLevel: "info",
        output: "html",
        onlyCategories: ["performance", "accessibility"],
        port: chrome.port,
    };

    let scores = [];

    for (let i = 0; i < ITERATIONS; i++) {
        const result = await lighthouse(TEST_URL, options);

        scores.push(result.lhr.categories.performance.score * 100);
    }

    const averagePerformanceScore = average(scores);

    await chrome.kill();

    if (averagePerformanceScore >= MINIMUM_ACCEPTABLE_SCORE) {
        actions.info(`Average performance score: ${averagePerformanceScore}`);
    } else {
        actions.setFailed(
            `Average performance score of ${averagePerformanceScore} is less than the minimum threshold of ${MINIMUM_ACCEPTABLE_SCORE}`
        );
    }
})();
