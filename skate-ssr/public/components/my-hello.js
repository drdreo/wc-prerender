class Hello extends HTMLElement {

    connectedCallback() {
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `<span>
            <span data-greeting>${this.getAttribute("greeting")}</span>,
            <strong><slot></slot></strong>!
            </span>`;
    }

    get greeting() {
        return this.getAttribute("greeting");
    }

    set greeting(value) {
        this.shadowRoot.querySelector("[data-greeting]").innerHTML = value;
        this.setAttribute("greeting", value);
    }
}

customElements.define("my-hello", Hello);
module.exports = Hello;
