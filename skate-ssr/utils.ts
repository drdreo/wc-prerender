import { readFile } from 'fs';
import { shadowRootScript } from './render';

export function renderToPage(file: string, component: string): Promise<string> {
	return new Promise<string>(resolve => {
		readFile(file, 'utf8', (err, data) => {
			let pageContent = data.replace('<body>', `<body>${shadowRootScript}`);
			resolve(pageContent.replace('</body>', `${component}</body>`));
		});
	});
}
