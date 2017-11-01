import AbstractView from '../view';
import App from '../application';
import {convertNumberToString, stringExampleMinutes, stringExampleSeconds, stringExampleScores, stringExampleFastAnswers, stringExampleFails} from '../data/game-data';
import {getTimeArrayFromSeconds} from '../utils';

export default class MainResult extends AbstractView {
  constructor(data) {
    super();
    this.data = data;
    this.minutes = getTimeArrayFromSeconds(this.data.spentTime)[0];
    this.seconds = getTimeArrayFromSeconds(this.data.spentTime)[1];
  }

  get template() {
    return (`
      <!-- Результат игры: выигрыш -->
      <section class="main main--result">
        <section class="logo" title="Угадай мелодию">
          <h1>Угадай мелодию</h1>
        </section>
        <h2 class="title"></h2>
        <div class="main-stat">
          За ${this.minutes} ${convertNumberToString(this.minutes, stringExampleMinutes)} и
          ${this.seconds} ${convertNumberToString(this.seconds, stringExampleSeconds)}
          <br>вы набрали ${this.data.userScore} ${convertNumberToString(this.data.userScore, stringExampleScores)}
          (${this.data.fastAnswers} ${convertNumberToString(this.data.fastAnswers, stringExampleFastAnswers)})
          <br>совершив ${this.data.fails} ${convertNumberToString(this.data.fails, stringExampleFails)}</div>
        <span class="main-comparison">${this.data.result}</span>
        <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
      </section>
    `);
  }

  bind() {
    const actionButton = this.element.querySelector(`.main-replay`);
    actionButton.onclick = (event) => {
      event.preventDefault();
      App.showWelcome();
    };
  }

  onStart() {}
}
