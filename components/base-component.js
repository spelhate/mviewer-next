import { mviewerEventBus }  from '../modules/event';

export class MviewerComponent extends HTMLElement {

    #template = document.createElement('template');

    static get observedAttributes() {
        return ['enabled'];
	}

    constructor() {
      super();
      this._enabled = this.hasAttribute('enabled');
      this.eventBus = mviewerEventBus;

    }

    set template(tpl) {
        this.#template.innerHTML = tpl;
    }

    render() {
        if (this._enabled) {
            this.appendChild(this.#template.content.cloneNode(true));
        } else {
            if (this.firstElementChild) {
                this.removeChild(this.firstElementChild);
            }

        }
        const evtType = 'mv-component-loaded';
        this.eventBus.dispatchEvent(evtType, { component: this, type: evtType});


    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name == 'enabled') {
            this._enabled = this.hasAttribute('enabled');
            this.render();
        }


    }



  }

