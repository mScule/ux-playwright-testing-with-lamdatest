import { expect } from '@playwright/test';
import { test } from '../lambdatest-setup';
import { createAxeA11yReport } from '../util/create-axe-a11y-report';

test('News time and name test ', async ({ page, browserName }, testInfo) => {

    // Go to the page Yle Areena
    await page.goto('https://areena.yle.fi/tv');

    await createAxeA11yReport(page, testInfo.title);

    if (browserName === "firefox" || browserName === "webkit")
        await page.getByRole('button', { name: 'Vain välttämättömät' }).click();

    // Expect the URL to be https://areena.yle.fi/tv
    await expect(page).toHaveURL('https://areena.yle.fi/tv');

    // Variable for the link to TV-opas
    const linkTvOpas = page.locator('#menu-main > ul > li:nth-child(4) > a > span');

    // Click on the link to TV-opas
    await linkTvOpas.click();

    // Expect the URL to be https://areena.yle.fi/tv/opas
    await expect(page).toHaveURL('https://areena.yle.fi/tv/opas');

    // Variable for the time 22.00
    const newsTime = page.locator('xpath=//*[@id="maincontent"]/div[1]/ul/li[5]/div/ul/li[31]/div[1]/span/span[1]/time[1]');

    // Look for the time 22.00 by clicking it
    await newsTime.click();

    // Variable for the name Kymmenen uutiset
    const newsName = page.locator('xpath=//*[@id="maincontent"]/div[1]/ul/li[5]/div/ul/li[31]/div[1]/span/span[2]/span');

    // Look for the name Kymmenen uutiset by clicking it
    await newsName.click();
});