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

const timings = [];
server.get('/ssr', async (req, res) => {
	const file = '/public/pages/index.html';

	const startTime = process.hrtime()
	const pageContent = await render(file);
	const endTime = process.hrtime(startTime)[1] / 1000000;
	timings.push(endTime);
	console.info('time: %dms', endTime);
	res.send(pageContent.replace('</body>', `${rehydrate}</body>`));
});

server.get('/avg', async (req, res) => {
	res.json({data: timings, total: timings.length -1, avg: timings.reduce((a,b) => a + b, 0) / timings.length});
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
