const path = require('path');
const puppeteer = require('puppeteer');

import { serialize } from './serialize';

let browser = null;
let page = null;

export const launched = puppeteer.launch().then(b => {
	return new Promise(resolve => {

		browser = b;

		browser.newPage().then(p => {
			page = p;
			// puppeteer console.log handler
			page.on('console', async msg => {
				const args = await msg.args();
				for (const arg of args) {
					const val = await arg.jsonValue();
					// value is serializable
					if (JSON.stringify(val) !== JSON.stringify({})) console.log(val);
					// value is unserializable (or an empty oject)
					else {
						const { type, subtype, description } = arg._remoteObject;
						console.log(`type: ${type}, subtype: ${subtype}, description:\n ${description}`);
					}
				}
			});

			resolve();
		});
	});
});

export function stopBrowser() {
	browser.close();
}

export async function render(fileName: string): Promise<string> {
	return new Promise(async (resolve, reject) => {
		page.removeAllListeners('load');
		// when the page was loaded, serialize the body content and write it to a file
		page.on('load', async (...args) => {
			await page.$eval('body', serialize);
			let content = await page.content();
			resolve(content);
		});
		await page.goto('file://' + path.join(__dirname, fileName));

	});
}
