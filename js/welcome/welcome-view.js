import AbstractView from '../view';
/**
 * 
 * 
 * @export
 * @class WelcomeView
 * @extends {AbstractView}
 */
export default class WelcomeView extends AbstractView {

  get template() {
    return (`
      <!-- Приветствие -->
      <section class="main main--welcome">
        <section class="logo" title="Угадай мелодию">
          <h1>Угадай мелодию</h1>
        </section>
        <button class="main-play">Начать игру</button>
        <h2 class="title main-title">Правила игры</h2>
        <p class="text main-text">
          Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br>
          Ошибиться можно 3 раза.<br>
          Удачи!
        </p>
      </section>
    `);
  }

  bind() {
    const actionButton = this.element.querySelector(`.main-play`);
    actionButton.onclick = (event) => {
      event.preventDefault();
      this.onStart();
    };
  }

  onStart() {}

}
