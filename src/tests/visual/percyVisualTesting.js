const PercyScript = require("@percy/script");

PercyScript.run(async (page, percySnapshot) => {
    await page.goto("http://localhost:3000/?search=maths");
    await page.waitForTimeout(100).then(".c-footer-main__heading");
    await percySnapshot("search page");
});
