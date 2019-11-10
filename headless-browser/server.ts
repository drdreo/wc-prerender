import fs from 'fs';
import { join } from 'path';
import express from 'express';

const server = express();
server.use(express.static('public'));

server.get('/', (req, res) => {
    res.redirect('/index.ssr.html');
});

server.get('*', (req, res, next) => {

    console.log('Serving: ', req.url);
    let htmlFile = req.url;
    if (!req.url.includes('.html') && !req.url.includes('.')) {
        htmlFile += '.ssr.html';
    }

    res.sendFile(join(__dirname + '/public/pages/' + htmlFile));
});

// server.get('*', (req, res) => {
//     res.sendFile('./public/pages/404.html');
// });


server.listen(3000, () => {
    console.log('Server is listening at https://localhost:3000');
});
