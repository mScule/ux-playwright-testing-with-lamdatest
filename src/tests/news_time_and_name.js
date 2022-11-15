const { expect } = require("@playwright/test");
const { test } = require("../utils/test");

const newsTimeNameTest = () => {
test('News time and name test ', async ({ page, browserName }) => {

    // Go to the page Yle Areena
    await page.goto('https://areena.yle.fi/tv');

    // Expect the URL to be https://areena.yle.fi/tv
    await expect(page).toHaveURL('https://areena.yle.fi/tv');

    const elementLink = await page.locator('#menu-main > ul > li:nth-child(4) > a > span');

    // Click on the link TV-opas
    await elementLink.click();

    // Expect the URL to be https://areena.yle.fi/tv/opas
    await expect(page).toHaveURL('https://areena.yle.fi/tv/opas');

    const elementNewsTime = await page.locator('xpath=//*[@id="maincontent"]/div[1]/ul/li[5]/div/ul/li[31]/div[1]/span/span[1]/time[1]');

    // Look for the time 22.00
    await elementNewsTime.click();

    const elementNewsName = await page.locator('xpath=//*[@id="maincontent"]/div[1]/ul/li[5]/div/ul/li[31]/div[1]/span/span[2]/span');

    // Look for Kymmenen uutiset
    await elementNewsName.click();
});
}

module.exports = { newsTimeNameTest };