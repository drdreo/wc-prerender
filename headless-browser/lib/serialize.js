module.exports = function serialize (rootNode) {
  function serializeNode (node) {
    try {
      const lightDomNodes = node.childNodes
      const lightDomHtml = node.innerHTML
      const templateDom = document.createElement('template')
      const scriptData = document.createElement('script')
      const slot = node.shadowRoot.querySelector('slot')
      const attributesProperties = node.getAttributeNames()
        .filter(name => name !== 'data-ssr')
        .reduce((obj, name) => {
            return {...obj, [name]: node[name] }
        }, {})

      templateDom.setAttribute('type', 'ssr-light-dom')

      templateDom.innerHTML = lightDomHtml

      scriptData.setAttribute('type', 'ssr-data')

      scriptData.innerHTML = JSON.stringify(attributesProperties)

      // move light nodes into shadowDom
      lightDomNodes.forEach(lightNode => slot.parentNode.insertBefore(lightNode, slot))

      // move shadowDom into root node
      node.shadowRoot.childNodes.forEach(shadowNode => node.appendChild(shadowNode))

      // remove slot element
      if (slot) {
        slot.parentNode.removeChild(slot)
      }

      // serialize custom element child nodes 
      serialize(node)

      // add original lightDom as template
      if (templateDom.innerHTML !== '') {
        node.appendChild(templateDom)
      }

      if (scriptData.innerHTML !== '{}') {
        node.appendChild(scriptData)
      }

      node.setAttribute('data-ssr', 'serialized')
    } catch (err) {
        console.log('error:', err)
    }
  }
  
  [...rootNode.querySelectorAll('*')]
      .filter(element => /-/.test(element.nodeName))
      .forEach(serializeNode)
}
