const TIME_TO_WAIT = 3000;
const template = `
<div class="card" aria-hidden="true">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title placeholder-glow">
      <span class="placeholder col-6"></span>
    </h5>
    <p class="card-text placeholder-glow">
      <span class="placeholder col-7"></span>
      <span class="placeholder col-4"></span>
      <span class="placeholder col-4"></span>
      <span class="placeholder col-6"></span>
      <span class="placeholder col-8"></span>
    </p>
    <a href="#" tabindex="-1" class="btn btn-primary disabled placeholder col-6"></a>
  </div>
</div>
`;

export class MviewerLoader extends HTMLElement {

    constructor() {
      super();

    }

    connectedCallback() {
        const tpl  = document.createElement('template');
        tpl.innerHTML = template;
        this.appendChild(tpl.content.cloneNode(true));

    }


  }

  customElements.define('mviewer-loader', MviewerLoader);