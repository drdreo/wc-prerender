function hydrate() {
    // @ts-ignore
    const elements = [...document.querySelectorAll('[data-ssr="serialized"]')];

    for (const el of elements) {
        const lightDom = el.querySelector('[type="ssr-light-dom"]');
        const dataElement = el.querySelector('[type="ssr-data"]');
        const dataContent = dataElement && dataElement.innerText;
        const data = dataContent && JSON.parse(dataContent);

        // replace the whole light DOM
        el.innerHTML = lightDom.innerHTML;

        //re-apply attributes
        data && Object.keys(data).forEach(key => {
            el[key] = data[key];
        });

        el.setAttribute('data-ssr', 'hydrated');
    }
}

export const rehydrate = `<script>${hydrate.toString()} hydrate();</script>`;
