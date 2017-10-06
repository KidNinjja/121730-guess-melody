class MainResultTime {
  constructor() {
    this.screenTemplate = (`
      <!-- Результат игры: проигрыш время вышло -->
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

      <h2 class="title">Увы и ах!</h2>
      <div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>
      <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
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
}

const initMainResultTime = new MainResultTime();

initMainResultTime.generateTemplate();

export default initMainResultTime;

initMainResultTime.actionButton.addEventListener(`click`, (event) => {
  event.preventDefault();
  window.location.reload(`true`);
});
