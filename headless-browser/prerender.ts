const path = require('path');
const fs = require('fs');

import { render, launched, stopBrowser } from './render';
import { rehydrate } from './hydrate';

const file = '/public/pages/index.html';

// need to wait for the browser to launch
launched
	.then(() => {
		render(file)
			.then((pageContent: string) => {
				console.log('[Headless Browser] Pre-rendering finished!');
				fs.writeFile(
					path.join(__dirname, file.replace('.html', '.ssr.html')),
					// add re-hydration script to the end of <body>
					pageContent.replace('</body>', `${rehydrate}</body>`),
					{ encoding: 'utf8' },
					async (err) => {
						if (err) console.log(err);
					},
				);

				stopBrowser();
			});
	});
