import { Widget } from "~/types/widget";

let root: HTMLElement;

const widget: Widget = {
    mount(el, dependencies, config) {
        root = el;
        /**
         * This is where you render your widget.
         */
        el.innerHTML = `
            <h1>Widget</h1>
            <p>Widget ID: ${config.id}</p>
            <p>Widget URL: ${config.url}</p>
            <p>Widget Type Name: ${config.typeName}</p>
            <p>Widget Properties: ${JSON.stringify(config.properties)}</p>
        `;
    },
    unmount() {
        /**
         * Cleanup the widget.
         */
        root.innerHTML = '';
    }
}

export default widget;
