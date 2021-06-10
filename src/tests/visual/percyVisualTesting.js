const PercyScript = require("@percy/script");
const { applicationBasePath } = require("../../constants/basePath");

PercyScript.run(async (page, percySnapshot) => {
    await page.goto(`http://localhost:3000${applicationBasePath}/?search=maths`);

    await page.waitForTimeout(100).then(".c-footer-main__heading");

    await percySnapshot("search page");

    // eslint-disable-next-line unicorn/no-process-exit
    process.exit();
});
