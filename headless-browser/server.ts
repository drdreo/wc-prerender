import { join } from 'path';
import express from 'express';
import { render } from './render';
import { rehydrate } from './hydrate';

const server = express();
const PORT = 3001;
server.use(express.static('public'));

server.get('/', (req, res) => {
	res.redirect('/index.ssr.html');
});

server.get('/ssr', async (req, res) => {
	const file = '/public/pages/index.html';
	console.time('ssr');
	const pageContent = await render(file);
	console.timeEnd('ssr');
	res.send(pageContent.replace('</body>', `${rehydrate}</body>`));
});

server.get('*', (req, res, next) => {
	console.log('Serving: ', req.url);
	let htmlFile = req.url;
	// if (!req.url.includes('.html') && !req.url.includes('.')) {
	//     htmlFile += '.ssr.html';
	// }

	res.sendFile(join(__dirname + '/public/pages/' + htmlFile));
});

server.listen(PORT, () => {
	console.log(`Server listening at http://localhost:${PORT}`);
});
