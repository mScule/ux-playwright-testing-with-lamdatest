const { chromium } = require('playwright')
const { capabilities } = require("./capabilities");

const test = async (name, test) => {
    const stringifiedCapabilities = encodeURIComponent(JSON.stringify({
        "build": name,
        "test": name,
        ...capabilities
    }));

    const browser = await chromium.connect({
        wsEndpoint:
            "wss://cdp.lambdatest.com/playwright" +
            `?capabilities=${stringifiedCapabilities}`
    });

    const page = await browser.newPage();

    const setStatus = async (passRemark, failRemark, event) => {
        const testStatus = (status, remark) => JSON.stringify({
            action: 'setTestStatus',
            arguments: { status , remark }
        });

        const pass = testStatus("passed", passRemark);
        const fail = testStatus("failed", failRemark);

        try {
            await event();
            await page.evaluate(_ => { }, `lambdatest_action: ${pass}`);
            console.log(`✅ ${name}`);
        } catch {
            await page.evaluate(_ => { }, `lambdatest_action: ${fail}`);
            console.log(`❌ ${name}`);
        }
    }

    await setStatus(
        `${name} Passes`,
        `${name} Fails`,
        async () => { await test({page}); }
    );

    await browser.close();
}

module.exports = { test };
