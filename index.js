import './scss/style.scss';
import { Tooltip as Tooltip, Toast as Toast, Popover as Popover } from 'bootstrap';
import "./modules/components";


const config_file = 'config.json';
//const config_file = 'default.xml';
const mviewer = document.querySelector("mviewer-app");
/* At this point only shared Bus event : mviewer.events is avalaible and loader component */
mviewer.events.on("loaded", function(e) {console.log("mviewer is loaded", e.target);});
//notification for each component loaded
mviewer.events.on("mv-component-loaded", function(e) {console.log(e.detail);});
//Choose one of this initializers
mviewer.config_file = config_file;
/*let config = '{"application":{"title":"mviewer bt4"},"mapoptions":{"center":[-280683.49531344074,6112461.814273552],"zoom":8},"components":[{"id":"navbar"},{"id":"map"},{"id":"sidebar","components":{"id":"treelayer"}}]}';
mviewer.config = config;*/



