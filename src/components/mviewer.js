import { MviewerEventBus }  from '../modules/event';
import { MviewerParser } from '../modules/parser';
import  "../modules/components";
import { MviewerLoader } from './loader';

export class MviewerApp extends HTMLElement{
    #map;
    #config_file;
    #config;

    static get observedAttributes() {
      return ['config', 'config_file'];
    }

    constructor() {
      super();
      this.loader = new MviewerLoader();
      this.events = new MviewerEventBus(this);
      this.container = document.createElement("div");
      this.container.classList.add("mv-container");
    }

    connectedCallback() {
      this.appendChild(this.loader);
      this.appendChild(this.container);
      this.dispatchEvent(new CustomEvent('loaded', { "mviewer": this }));
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (newValue && newValue != oldValue) {
        switch (name) {
          case 'config':
              this.#config = JSON.parse(newValue);
              this.applyConfig();
            break;

          case 'config_file':
            this.#config_file = newValue;
            this.#loadConfig(this.#config_file);
            break;
        }

      }

    }

    set config_file(config_file) {
      this.setAttribute("config_file", config_file);
    }

    get config_file() {
      return this.#config_file;
    }

    set config(config) {
      this.setAttribute("config", config);
    }

    get config() {
      return this.#config;
    }

    get map() {
      return this.#map;
    }

    applyConfig() {
      if (this.#config.application.style) {
        const style = this.#config.application.style;
        const link = document.createElement("link");
        link.href = style;
        link.rel = "stylesheet";
        this.insertBefore(link, this.firstElementChild);


      }
      this.#enableComponents();
      this.#configIHM();
      //Dispatch event on <mviewer-app> element
      this.events.eventTarget.dispatchEvent(new CustomEvent("loaded", { "mviewer": this}));
    }

    async #loadConfig(config_file) {
      this.#config_file = config_file;
      const parser = new MviewerParser(this.#config_file);
      this.#config = await parser.parse();
      this.applyConfig();
    }

    #enableComponents() {
        const self = this;
        this.#config.components.forEach(function (cp) {
          if (customElements.get(`mviewer-${cp.id}`) ){
            const component = document.createElement(`mviewer-${cp.id}`);
            component.sharedEventBus = self.events;
            component.configuration = self.#config;
            component.classList.add('mv-component');
            self.container.appendChild(component);
          } else {
            console.log(`Le composant ${cp.id} n'est pas défini`);
          }



        })
        const evtType = 'mv-all-components-loaded';
        self.events.dispatchEvent(evtType, { components: this.#config.components, type: evtType });
        setTimeout(() => this.#ready(), 3000);

    }

    #ready() {
      this.loader.hidden = true;
      this.container.classList.add("ready");
      //this.querySelectorAll(".mv-component").forEach(cp => {cp.classList.add("mv-component-ready")});
    }

    #configIHM() {
      document.head.querySelector("title").innerText = this.#config.application.title;
      const evtType = 'mv-ihm-ready';
      this.events.dispatchEvent(evtType, { title: this.#config.application.title, type: evtType });
    }

    getCenter() {
      return this.map.getView().getCenter();
    }
  }

  customElements.define('mviewer-app', MviewerApp);


