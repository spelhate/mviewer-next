import { MviewerComponent } from './base-component';

const template = `
<nav class="navbar navbar-dark bg-dark">
    <a class="navbar-brand" href="#">Navbar</a>
    <!--<mviewer-component enabled></mviewer-component>-->
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <!-- toggler -->
    <button class="btn float-end" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" role="button">
        <span class="navbar-toggler-icon" data-bs-toggle="offcanvas" data-bs-target="#offcanvas"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
            <a class="nav-item nav-link active" href="#">Home <span class="sr-only">(current)</span></a>
            <a class="nav-item nav-link" href="#">Features</a>
            <a class="nav-item nav-link" href="#">Pricing</a>
            <a class="nav-item nav-link disabled" href="#">Disabled</a>
        </div>
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