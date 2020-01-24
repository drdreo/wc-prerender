import { join } from 'path';
import { readFile } from 'fs';
import express from 'express';
import { render, shadowRootScript } from './render';
import { renderToPage } from './utils';

const server = express();
const PORT = 3002;
const timings = [];

server.use(express.static('public'));

server.get('/', (req, res) => {
	res.redirect('/index.ssr.html');
});

server.get('/ssr', async (req, res) => {
	const name =  req.query.name || 'Felix';
	const file = './public/pages/index.html';
	// the web component to render
	const Hello = require('./public/components/my-hello');
	const hello = new Hello();
	hello.textContent = name;
	hello.setAttribute('greeting', 'Sias');

	const startTime = process.hrtime()
	const serializedHello = await render(hello);
	const pageContent = await renderToPage(file, serializedHello);
	const endTime = process.hrtime(startTime)[1] / 1000000;
	timings.push(endTime);
	console.info('time: %dms', endTime);
	res.send(pageContent);
});

server.get('/avg', async (req, res) => {
	res.json({data: timings, total: timings.length -1, avg: timings.reduce((a,b) => a + b, 0) / timings.length});
});


server.get('*', (req, res, next) => {
	console.log('Serving: ', req.url);
	let htmlFile = req.url;

	res.sendFile(join(__dirname + '/public/pages/' + htmlFile));
});

server.listen(PORT, () => {
	console.log(`Server listening at http://localhost:${PORT}`);
});
