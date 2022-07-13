import { MviewerComponent } from './base-component';

const template = `
<nav class="navbar fixed-top navbar-dark bg-dark">
<div class="container-fluid">
    <a class="navbar-brand" href="#">mviewer next</a>
    <!-- toggler -->
    <button class="btn float-end" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" role="button">
        <span class="navbar-toggler-icon" data-bs-toggle="offcanvas" data-bs-target="#offcanvas"></span>
    </button>
</div>
</nav>
`;

export class MviewerNavbar extends MviewerComponent {

    constructor() {
      super();

    }

    connectedCallback() {
        const tpl  = document.createElement('template');
        tpl.innerHTML = template;
        this.appendChild(tpl.content.cloneNode(true));
        const evtType = 'mv-component-loaded';
        this.eventBus.dispatchEvent(evtType, { component: this, type: evtType});
    }


  }

  customElements.define('mviewer-navbar', MviewerNavbar);