const shadowRootScript = `<script>function __ssr() {var r,s=document.currentScript,f=s.parentNode;h=f.parentNode;f.removeChild(s);h.removeChild(f);r=h.attachShadow({mode:h.getAttribute('mode')||'open'});while(f&&f.firstChild)r.appendChild(f.firstChild);}</script>`;
const shadowRootScriptCall = `<script>__ssr()</script>`;


export function stringify(node) {
    let str = '';

    if (node.nodeName === '#document') {
        node = node.documentElement;
        str += '<!doctype html>';
    }

    if (node.nodeName === '#text') {
        return node.textContent;
    }

    str += `<${node.localName}${(node.attributes || [])
        .map(a => ` ${a.name}="${a.value}"`)
        .join('')}>`;

    if (node.nodeName === 'BODY') {
        str += shadowRootScript;
    }

    if (node.shadowRoot) {
        str += `<shadowroot>${node.shadowRoot.childNodes
                                  .map(stringify)
                                  .join('')}${shadowRootScriptCall}</shadowroot>`;
    }

    if (node.childNodes) {
        str += node.childNodes.map(stringify).join('');
    }

    str += `</${node.localName}>`;

    return str;
}
