class RealCounter extends HTMLElement {

    counterValue = 0;

    constructor() {
        super();

        setInterval(() => {
            this.counter++;
        }, 500);
    }

    connectedCallback() {
        this.attachShadow({mode: "open"});
        this.render();
    }

    set counter(time) {
        this.counterValue = time;
        this.render();
    }

    get counter() {
        return this.counterValue;
    }

    render() {
        this.shadowRoot.innerHTML = `<color-text>${this.counter}</color-text>!`;
    }
}

window.customElements.define("real-counter", RealCounter);
