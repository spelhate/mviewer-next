const TIME_TO_WAIT = 3000;
const template = `
<style>
mviewer-loader {
    height: 100%;
    display: flex;
    display: flex;
    align-items: center;
}
.loader.card {
  width: 50%;
  height: 50%;
}
</style>
<div class="card loader mx-auto" aria-hidden="true">
<svg class="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"></rect></svg>
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