import './scss/style.scss';
import { Tooltip as Tooltip, Toast as Toast, Popover as Popover } from 'bootstrap';
import Mviewer from './modules/mviewer.js';

const config_file = 'config.json';
//const config_file = 'default.xml';
const mviewer = new Mviewer();
mviewer.events.on("mv-map-loaded", function(e) {console.log(e.detail);});
mviewer.events.on("mv-components-loaded", function(e) {console.log(e.detail);});
//notification for each component loaded
mviewer.events.on("mv-component-loaded", function(e) {console.log(e.detail);});
mviewer.loadConfig(config_file);

//Set mviewer globally
window.mviewer = mviewer;



