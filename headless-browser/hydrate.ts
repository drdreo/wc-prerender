function hydrate() {
    // @ts-ignore
    const elements = [...document.querySelectorAll('[data-ssr="serialized"]')];

    for (const el of elements) {
        const lightDom = el.querySelector('[type="ssr-light-dom"]');
        const lightDomContent = lightDom && lightDom.content;
        const dataElement = el.querySelector('[type="ssr-data"]');
        const dataContent = dataElement && dataElement.innerText;
        const data = dataContent && JSON.parse(dataContent);

        el.childNodes.forEach(node => {
            if (node !== lightDom) {
                node.parentElement.removeChild(node);
            }
        });

        lightDomContent && lightDomContent.childNodes.forEach(node => el.appendChild(node));
        lightDom && lightDom.parentElement.removeChild(lightDom);
        dataElement && dataElement.parentElement && dataElement.parentElement.removeChild(dataElement);
        data && Object.keys(data).forEach(key => {
            el[key] = data[key];
        });

        el.setAttribute('data-ssr', 'hydrated');
    }
}

export const rehydrate = `<script>${hydrate.toString()}
hydrate();</script>`;
