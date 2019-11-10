const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');

import { serialize } from './serialize';
import { rehydrate } from './hydrate';

async function prerender(fileName: string) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // puppeteer console.log handler
    page.on('console', async msg => {
        const args = await msg.args();
        for (const arg of args) {
            const val = await arg.jsonValue();
            // value is serializable
            if (JSON.stringify(val) !== JSON.stringify({})) console.log(val);
            // value is unserializable (or an empty oject)
            else {
                const {type, subtype, description} = arg._remoteObject;
                console.log(`type: ${type}, subtype: ${subtype}, description:\n ${description}`);
            }
        }
    });

    // when the page was loaded, serialize the body content and write it to a file
    page.on('load', async (...args) => {

        await page.$eval('body', serialize);
        const pageContent = await page.content();

        fs.writeFile(
            path.join(__dirname, fileName.replace('.html', '.ssr.html')),
            pageContent.replace('</body>', `${rehydrate}</body>`),
            {encoding: 'utf8'},
            async (err) => {
                await browser.close();
            },
        );
    });

    await page.goto('file://' + path.join(__dirname, fileName));
}

prerender('/public/pages/index.html')
    .then(() => {
        console.log('Pre-rendering finished!');
    });
