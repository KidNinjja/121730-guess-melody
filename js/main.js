'user strict';

const template = document.getElementById(`templates`);
const templateContainer = `content` in template ? template.content : template;

class MusicApplication {
  constructor(screenTemplates) {
    this.screenTemplate = screenTemplates.cloneNode(true);
    this.screenTemplateList = null;
    this.screenTemplateLenght = null;
    this.currentScreen = 0;
  }

  createScreenList() {
    this.screenTemplateList = document.querySelectorAll(`section.main > .main`);
    this.screenTemplateLenght = this.screenTemplateList.length;
  }

  renderTemplate(wrapper) {
    wrapper.appendChild(this.screenTemplate);
    this.createScreenList();
    this.screenTemplateList[this.currentScreen].classList.add(`main--active`);
  }

  setNextScreen(count) {
    this.updateCurrentScreen(this.currentScreen + count);
  }

  setPreviousScreen(count) {
    this.updateCurrentScreen(this.currentScreen - count);
  }

  updateCurrentScreen(count) {
    this.screenTemplateList[this.currentScreen].classList.remove(`main--active`);
    this.currentScreen = (count + this.screenTemplateLenght) % this.screenTemplateLenght;
    this.screenTemplateList[this.currentScreen].classList.add(`main--active`);
  }

}

const mainApplicationWrapper = document.querySelector(`.main`);
const initMusicApplication = new MusicApplication(templateContainer);

const RIGHT_ARROW_KEY_CODE = 39;
const LEFT_ARROW_KEY_CODE = 37;

document.addEventListener(`DOMContentLoaded`, function () {
  initMusicApplication.renderTemplate(mainApplicationWrapper);
});

document.addEventListener(`keydown`, function (event) {
  switch (true) {
    case event.altKey && event.keyCode === RIGHT_ARROW_KEY_CODE:
      event.preventDefault();
      initMusicApplication.setNextScreen(1);
      break;
    case event.altKey && event.keyCode === LEFT_ARROW_KEY_CODE:
      event.preventDefault();
      initMusicApplication.setPreviousScreen(1);
      break;
  }
});
