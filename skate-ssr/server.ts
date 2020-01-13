import { join } from 'path';
import { readFile } from 'fs';
import express from 'express';
import { render, shadowRootScript } from './render';
import { renderToPage } from './utils';

const server = express();
const PORT = 3002;

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

	console.time('ssr');
	const serializedHello = await render(hello);
	const pageContent = await renderToPage(file, serializedHello);
	console.timeEnd('ssr');
	res.send(pageContent);
});

server.get('*', (req, res, next) => {
	console.log('Serving: ', req.url);
	let htmlFile = req.url;

	res.sendFile(join(__dirname + '/public/pages/' + htmlFile));
});

server.listen(PORT, () => {
	console.log(`Server listening at http://localhost:${PORT}`);
});
