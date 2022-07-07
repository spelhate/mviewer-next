import { MviewerComponent } from './base-component';
const template =  `
<div class="offcanvas offcanvas-start w-25" tabindex="-1" id="offcanvas" data-bs-keyboard="false" data-bs-backdrop="false">
    <div class="offcanvas-header">
        <h6 class="offcanvas-title d-none d-sm-block" id="offcanvas">Menu</h6>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body px-0">
        <p>Left Panel</p>
    </div>
</div>
`;

export default class MviewerSidebar extends MviewerComponent {

    constructor() {
      super();
      this.template = template;
    }


    connectedCallback() {
    }


  }

  customElements.define('mviewer-sidebar', MviewerSidebar);