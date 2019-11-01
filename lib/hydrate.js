function hydrate() {
	[...document.querySelectorAll('[data-ssr="serialized"]')]
		.forEach(el => {
			const lightDom = el.querySelector('[type="ssr-light-dom"]')
			const lightDomContent = lightDom && lightDom.content
			const dataElement = el.querySelector('[type="ssr-data"]')
			const dataContent = dataElement && dataElement.innerText
			const data = dataContent && JSON.parse(dataContent)

			el.childNodes.forEach(node => {
				if (node !== lightDom) {
					node.parentElement.removeChild(node)
				}
			})

			lightDomContent && lightDomContent.childNodes.forEach(node => el.appendChild(node))
			lightDom && lightDom.parentElement.removeChild(lightDom)
			dataElement && dataElement.parentElement && dataElement.parentElement.removeChild(dataElement)
			data && Object.keys(data).forEach(key => {
				el[key] = data[key]
			})

			el.setAttribute('data-ssr', 'hydrated')
		}
	)
}

module.exports = `<script>${hydrate.toString()}; hydrate();</script>`