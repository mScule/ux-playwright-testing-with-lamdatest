import AxeBuilder from "@axe-core/playwright"
import { createHtmlReport } from "axe-html-reporter";
import fs from "fs";

export const createAxeA11yReport = async (page, title) => {
    const axe = new AxeBuilder({ page }).setLegacyMode(true);

    try {
        const results = await axe.analyze();

        const numPadding = (num) => num > 9 ? num + "" : "0" + num;

        const reportDate = new Date();
        const reportDateString =
            numPadding(reportDate.getFullYear()) + "-" +
            numPadding(reportDate.getMonth())    + "-" +
            numPadding(reportDate.getDate())     + "-" +
            numPadding(reportDate.getHours())    + "-" +
            numPadding(reportDate.getMinutes())  + "-" +
            numPadding(reportDate.getSeconds());

        const reportHTML = createHtmlReport({
            results,
            options: {
                projectKey: `Yle areena "${title}" ${reportDateString}`,
                doNotCreateReportFile: false,
            },
        });

        const reportPath =
            `reports/accessability-report-${
                title.toLowerCase().replace(/\s/g, "-")
            }-${reportDateString}.html`;

        // suggestion on how to create file by yourself
        if (!fs.existsSync(reportPath)) {
            fs.mkdirSync('reports', {
                recursive: true,
            });
        }
        fs.writeFileSync(reportPath, reportHTML);
    } catch (e) {
        console.log(e.message);
    }
}
