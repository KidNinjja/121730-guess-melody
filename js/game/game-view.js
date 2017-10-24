import AbstractView from "../view";
import Timer from '../elements/timer';
import Mistakes from '../elements/main-mistakes';

const updateMarkup = (container, view) => {
  container.innerHTML = ``;
  container.appendChild(view.element);
};

export default class GameView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return (`
      <section class="app">
        <div class="timer-container"></div>
        <div class="main-mistakes"></div>
      </section>
    `);
  }

  bind() {
    this.timer = this.element.querySelector(`.timer-container`);
    this.mistakes = this.element.querySelector(`.main-mistakes`);
  }

  updateTimer(data) {
    updateMarkup(this.timer, new Timer(data));
  }

  updateMistakes(data) {
    updateMarkup(this.mistakes, new Mistakes(data));
  }

  updateGenreScreen() {

  }
}
