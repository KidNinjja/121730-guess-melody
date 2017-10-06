
import MainWelcomeView from './main.js';

class RenderTemplate {
  constructor() {
    this.mainWrapper = document.querySelector(`.app`);
  }

  removeTemplate() {
    const removedElements = this.mainWrapper.querySelectorAll(`.main`);
    for (let i = 0; i < removedElements.length; i++) {
      this.mainWrapper.removeChild(removedElements[i]);
    }
  }

  renderTemplate(screenTemplate) {
    this.removeTemplate();
    this.mainWrapper.appendChild(screenTemplate);
  }
}

const initRenderTemplate = new RenderTemplate();

export default initRenderTemplate;

document.addEventListener(`DOMContentLoaded`, () => {
  initRenderTemplate.renderTemplate(MainWelcomeView.getTemplate());
});
