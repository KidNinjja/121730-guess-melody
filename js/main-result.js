
import RenderTemplate from './render.js';
import MainResultTime from './main-result-time.js';
import MainResultOver from './main-result-over.js';

class MainResult {
  constructor() {
    this.screenTemplate = (`
      <!-- Результат игры: выигрыш -->
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

      <h2 class="title">Вы настоящий меломан!</h2>
      <div class="main-stat">За&nbsp;3&nbsp;минуты и 25&nbsp;секунд
        <br>вы&nbsp;набрали 12 баллов (8 быстрых)
        <br>совершив 3 ошибки</div>
      <span class="main-comparison">Вы заняли 2 место из 10. Это&nbsp;лучше чем у&nbsp;80%&nbsp;игроков</span>
      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
    `);
    this.createdTemplate = document.createElement(`section`);
    this.actionButton = null;
  }

  generateTemplate() {
    this.createdTemplate.insertAdjacentHTML(`afterbegin`, this.screenTemplate);
    this.createdTemplate.setAttribute(`class`, `main main--result`);
    this.actionButton = this.createdTemplate.querySelector(`.main-replay`);
  }

  getTemplate() {
    return this.createdTemplate;
  }

  getRandomInteger(max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

const initMainResult = new MainResult();

initMainResult.generateTemplate();

export default initMainResult;

initMainResult.actionButton.addEventListener(`click`, () => {
  if (initMainResult.getRandomInteger(1, 3) <= 2) {
    RenderTemplate.renderTemplate(MainResultTime.getTemplate());
  } else if (initMainResult.getRandomInteger(1, 5) >= 2) {
    RenderTemplate.renderTemplate(MainResultOver.getTemplate());
  }
});
