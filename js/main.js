'user strict';

const template = document.getElementById(`templates`);
const templateContainer = `content` in template ? template.content : template;

/**
 * [screenTemplates documentFragment]
 * @type {[object]}
 */
class MusicApplication {
  constructor(screenTemplates) {
    this.mainWrapper = document.querySelector(`.main`);
    this.screenTemplateExample = screenTemplates;
    this.screenTemplateList = [];
    this.screenTemplateLenght = null;
    this.currentScreen = 0;
  }

  createScreenTemplates() {
    for (let i = 0; i < this.screenTemplateExample.children.length; i++) {
      this.screenTemplateList.push(this.screenTemplateExample.children[i].cloneNode(true));
    }
    this.screenTemplateLenght = this.screenTemplateList.length;
  }

  renderTemplate() {
    this.createScreenTemplates();
    this.mainWrapper.appendChild(this.screenTemplateList[this.currentScreen]);
  }

  /**
   * [setNextScreen Переключает экран на count вперед]
   * @param {[number]} count [Целое число]
   */
  setNextScreen(count) {
    this.updateCurrentScreen(this.currentScreen + count);
  }

  /**
   * [setPreviousScreen Переключает экран на count назад]
   * @param {[number]} count [Целое число]
   */
  setPreviousScreen(count) {
    this.updateCurrentScreen(this.currentScreen - count);
  }

  /**
   * [updateCurrentScreen Находит текущий экран при заничении count]
   * @param  {[number]} count [Целое число]
   */
  updateCurrentScreen(count) {
    this.mainWrapper.removeChild(this.screenTemplateList[this.currentScreen]);
    this.currentScreen = (count + this.screenTemplateLenght) % this.screenTemplateLenght;
    this.mainWrapper.appendChild(this.screenTemplateList[this.currentScreen]);
  }
}

const initMusicApplication = new MusicApplication(templateContainer);

const RIGHT_ARROW_KEY_CODE = 39;
const LEFT_ARROW_KEY_CODE = 37;

document.addEventListener(`DOMContentLoaded`, function () {
  initMusicApplication.renderTemplate();
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
