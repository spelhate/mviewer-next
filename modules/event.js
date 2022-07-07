import { MVIEWER_SELECTOR } from "./constantes";
export default class MviewerEventBus {

    constructor(selector) {
        //selector is dom selector. Eg '#mviewer'
        //this.eventTarget is the DOM element used to wrap events
        this.eventTarget = document.querySelector(selector);
    }
    get instance() {
        return this;
    }
    on(type, listener) {
        this.eventTarget.addEventListener(type, listener);
    }
    once(type, listener) {
        this.eventTarget.addEventListener(type, listener, { once: true });
    }
    un(type, listener) {
        this.eventTarget.removeEventListener(type, listener);
    }
    dispatchEvent(type, detail) {
        return this.eventTarget.dispatchEvent(new CustomEvent(type, { detail }));
    }
}

export const mviewerEventBus = new MviewerEventBus(MVIEWER_SELECTOR);

