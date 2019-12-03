class ColorText extends HTMLElement {
    connectedCallback() {
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `<style>*{color: cornflowerblue;}</style>
        <slot></slot>`;
    }
}

window.customElements.define("color-text", ColorText);
