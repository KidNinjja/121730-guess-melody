class MainResultOver {
  constructor() {
    this.screenTemplate = (`
      <!-- Результат игры: проигрыш закончились попытки -->
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

      <h2 class="title">Какая жалость!</h2>
      <div class="main-stat">У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!</div>
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

const initMainResultOver = new MainResultOver();

initMainResultOver.generateTemplate();

export default initMainResultOver;

initMainResultOver.actionButton.addEventListener(`click`, (event) => {
  event.preventDefault();
  window.location.reload(`true`);
});
