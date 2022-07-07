import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { MVIEWER_SELECTOR, EVENT_TYPES } from './constantes';
import { mviewerEventBus }  from './event';
import { MviewerParser } from './parser';


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
      this.#loadMap();
      this.#enableComponents();
      this.#configIHM();
    }

    #loadMap() {
      this.#map =  new Map({
        target: 'map',
        layers: [
          new TileLayer({
            source: new OSM()
          })
        ],
        view: new View({
          center: this.config.mapoptions.center,
          zoom: this.config.mapoptions.zoom
        })
      });
      const evtType = 'mv-map-loaded';
      this.events.dispatchEvent(evtType, { map: this.#map, type: evtType });
    }

    #enableComponents() {
        const self = this;
        this.config.components.forEach(function (cp) {
            Array.from(self.element.getElementsByTagName(`mviewer-${cp}`)).forEach(el => el.setAttribute("enabled",""));

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


