class ColorText extends HTMLElement {
    connectedCallback() {
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `<style>*{color: cornflowerblue;}</style>
        <b><slot></slot></b>`;
    }
}

customElements.define("color-text", ColorText);
