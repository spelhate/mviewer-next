import { mviewerEventBus }  from '../modules/event';

export class MviewerComponent extends HTMLElement {

    static get observedAttributes() {
        return ['enabled'];
	}

    constructor(config) {
      super();
      this.eventBus = mviewerEventBus;
      this.config = config;
    }

  }

