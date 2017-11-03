import AbstractView from '../view';
import App from '../application';
import {convertNumberToString, stringExampleMinutes, stringExampleSeconds, stringExampleScores, stringExampleFastAnswers, stringExampleFails} from '../data/game-data';
import {getTimeArrayFromSeconds} from '../utils';
import {gameResultTitle} from './main-result-data';

export default class MainResult extends AbstractView {
  constructor(data) {
    super();
    this.data = data;
    this.minutes = getTimeArrayFromSeconds(this.data.spentTime)[0];
    this.seconds = getTimeArrayFromSeconds(this.data.spentTime)[1];
    this.winTemplate = (`
      <h2 class="title">${gameResultTitle.win.title}</h2>
      <div class="main-stat">
        За ${this.minutes} ${convertNumberToString(this.minutes, stringExampleMinutes)} и
        ${this.seconds} ${convertNumberToString(this.seconds, stringExampleSeconds)}
        <br>вы набрали ${this.data.userScore} ${convertNumberToString(this.data.userScore, stringExampleScores)}
        (${this.data.fastAnswers} ${convertNumberToString(this.data.fastAnswers, stringExampleFastAnswers)})
        <br>совершив ${this.data.fails} ${convertNumberToString(this.data.fails, stringExampleFails)}
      </div>
      <span class="main-comparison">${this.data.result}</span>
    `);
    this.loseTemplate = (`
    <h2 class="title">${this.data.fails === 3 ? gameResultTitle.gameOver.title : gameResultTitle.timeLeft.title}</h2>
      <div class="main-stat">
        <span class="main-comparison">${this.data.result}</span></br>
      </div>
    `);
  }

  get template() {
    return (`
      <!-- Результат игры: выигрыш -->
      <section class="main main--result">
        <section class="logo" title="Угадай мелодию">
          <h1>Угадай мелодию</h1>
        </section>
        ${this.data.fails === 3 || this.data.spentTime <= 0 ? this.loseTemplate : this.winTemplate }
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
