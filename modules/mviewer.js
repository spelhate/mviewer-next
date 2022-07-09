import { MVIEWER_SELECTOR, EVENT_TYPES } from './constantes';
import { mviewerEventBus }  from './event';
import { MviewerParser } from './parser';
import  "../modules/components";

export default class Mviewer {
    #map;
    constructor() {
      this.element = document.querySelector( MVIEWER_SELECTOR);
      this.config_file = undefined;
      this.config = undefined;
      this.events = mviewerEventBus;
    }

    get map() {
      return this.#map;
    }

    async loadConfig(config_file) {
      this.config_file = config_file;
      const parser = new MviewerParser(this.config_file);
      this.config = await parser.parse();
      this.#enableComponents();
      this.#configIHM();
    }

    #enableComponents() {
        const self = this;
        this.config.components.forEach(function (cp) {
          if (customElements.get(`mviewer-${cp.id}`) ){
            const component = document.createElement(`mviewer-${cp.id}`);
            self.element.appendChild(component);
          } else {
            console.log(`Le composant ${cp.id} n'est pas défini`);
          }



        })
        const evtType = 'mv-all-components-loaded';
        self.events.dispatchEvent(evtType, { components: this.config.components, type: evtType });

    }

    #configIHM() {
      document.head.querySelector("title").innerText = this.config.application.title;
      const evtType = 'mv-ihm-ready';
      this.events.dispatchEvent(evtType, { title: this.config.application.title, type: evtType });
    }

    getCenter() {
      return this.map.getView().getCenter();
    }
  }


