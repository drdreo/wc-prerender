const path = require("path");
const puppeteer = require("puppeteer");
const fs = require("fs");

const serialize = require("./lib/serialize");
const hydrate = require("./lib/hydrate")

;(async (fileName) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    page.on("console", event => console.log(event._text));

    page.on("load", async (...args) => {
        await page.$eval("body", serialize);
        const pageContent = await page.content();

        fs.writeFile(
            path.join(__dirname, fileName.replace(".html", ".ssr.html")),
            pageContent.replace("</body>", `${hydrate}</body>`),
            {encoding: "utf8"},
            async (err) => {
                await browser.close();
            }
        );
    });

    await page.goto("file://" + path.join(__dirname, fileName));
})("/public/index.html");
