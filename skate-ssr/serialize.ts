// This provides the DOM API, so load it first.
require('@skatejs/ssr/register');

// Renders the provided DOM tree to a string.
const render = require('@skatejs/ssr');

// the web component to render
import Hello from './my-hello';

const hello = new Hello();
hello.textContent = 'Felix';
hello.setAttribute('greeting', 'Sias');
render(hello).then(console.log);
