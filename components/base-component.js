import { mviewerEventBus }  from '../modules/event';

export class MviewerComponent extends HTMLElement {

    constructor() {
      super();
      this.config = undefined;
      this.eventBus = undefined;
    }

    set configuration (config) {
      this.config = config;
    }

    set sharedEventBus (eventBus) {
      this.eventBus = eventBus;
    }

  }

