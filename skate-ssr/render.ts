// This provides the DOM API, so load it first.
require('@skatejs/ssr/register');

// Renders the provided DOM tree to a string.
export const render = require('@skatejs/ssr');
export const shadowRootScript = `<script>function __ssr() {var r,s=document.currentScript,f=s.parentNode;h=f.parentNode;f.removeChild(s);h.removeChild(f);r=h.attachShadow({mode:h.getAttribute('mode')||'open'});while(f&&f.firstChild)r.appendChild(f.firstChild);}</script>`;
