const { expect } = require("@playwright/test");
const { test } = require("../utils/test");

const exampleTest = () => {
    test("Example test", async ({ page }) => {
        await page.goto('https://www.bing.com')

        const element = await page.$('[aria-label="Enter your search term"]')
        await element.click()
        await element.type('LambdaTest')
        await element.press('Enter')
        const title = await page.title()

        expect(title).toEqual('LambdaTest - Search')
    });
}

module.exports = { exampleTest };
