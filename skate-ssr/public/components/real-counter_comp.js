class RealCounter extends HTMLElement {
    constructor() {
        super();

        this.counterValue = 0;
    }

    connectedCallback() {
        this.attachShadow({mode: "open"});
        this.render();
        this.interval = setInterval(() => {
            this.counter++;
        }, 500);
    }

    disconnectedCallback() {
        clearInterval(this.interval);
    }

    set counter(count) {
        console.log("setting counter to: " + count);
        this.counterValue = count;
        this.render();
    }

    get counter() {
        return this.counterValue;
    }

    render() {
        this.shadowRoot.innerHTML = `<div><color-text>${this.counter}</color-text>!</div>`;
    }
}

customElements.define("real-counter", RealCounter);
