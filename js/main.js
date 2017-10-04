'user strict';

import RenderTemplate from './render.js';
import MainLevelArtist from './main-level-artist.js';

class MainWelcomeView {
  constructor() {
    this.screenTemplate = (`
      <!-- Приветствие -->
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
      <button class="main-play">Начать игру</button>
      <h2 class="title main-title">Правила игры</h2>
      <p class="text main-text">
        Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br>
        Ошибиться можно 3 раза.<br>
        Удачи!
      </p>
    `);
    this.createdTemplate = document.createElement(`section`);
    this.actionButton = null;
  }

  generateTemplate() {
    this.createdTemplate.insertAdjacentHTML(`afterbegin`, this.screenTemplate);
    this.createdTemplate.setAttribute(`class`, `main main--welcome`);
    this.actionButton = this.createdTemplate.querySelector(`.main-play`);
  }

  getTemplate() {
    return this.createdTemplate;
  }
}

const initMainWelcomeView = new MainWelcomeView();

initMainWelcomeView.generateTemplate();

initMainWelcomeView.actionButton.addEventListener(`click`, (event) => {
  event.preventDefault();
  RenderTemplate.renderTemplate(MainLevelArtist.getTemplate());
});

export default initMainWelcomeView;
