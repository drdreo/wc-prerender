import { render } from './render';

import { join } from 'path';
import { writeFile } from 'fs';
import { renderToPage } from './utils';

// the web component to render
const Hello = require('./public/components/my-hello');

const hello = new Hello();
hello.textContent = 'Felix';
hello.setAttribute('greeting', 'Sias');

const ColorText = require('./public/components/color-text');
const colorText = new ColorText();

const RealCounter = require('./public/components/real-counter');
const counter = new RealCounter();

const allRendered = Promise.all([
	render(hello),
	render(counter)
]);


allRendered.then(serializedComponents => {
	const file = './public/pages/index.html';

	renderToPage(file, serializedComponents.join('')).then(pageContent => {
		writeFile(
			join(__dirname, file.replace('.html', '.ssr.html')),
			pageContent,
			{encoding: 'utf8'},
			async (err) => {
				if (err) {
					console.log(err);
				} else {
					console.log('[Skate/ssr] Pre-rendering finished successfully!');
				}
			});
	});
});
