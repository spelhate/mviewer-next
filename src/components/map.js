import { MviewerComponent } from './base-component';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';

const template =  `
<style>
@import "ol/ol.css"
          #map {
            position: fixed;
            height:100%;
            width: 100%;
        }
        </style>
        <div id="map"></map>
`;

export default class MviewerMap extends MviewerComponent {

    constructor() {
        super();
        // ebentBus & config are herited from MviewerComponent
    }


    connectedCallback() {
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', 'ol.css');
        this.appendChild(link);
        const div = document.createElement('div');
        div.style.width = '100%';
        div.style.height = '100%';
        div.style.position = 'fixed';
        div.id ="map";
        this.appendChild(div);
        this.map =  new Map({
            target: div,
            controls:[],
            layers: [
            new TileLayer({
                source: new OSM()
            })
            ],
            view: new View({
            center: this.config?.mapoptions?.center || [0, 0],
            zoom: this.config?.mapoptions?.zoom || 2
            })
        });

        const evtType = 'mv-component-loaded';
        this.eventBus.dispatchEvent(evtType, { component: this, type: evtType});

    }


  }

  customElements.define('mviewer-map', MviewerMap);