import AbstractView from '../view';
import App from '../application';
import {convertNumberToString, stringExampleMinutes, stringExampleSeconds, stringExampleScores, stringExampleFastAnswers, stringExampleFails} from '../data/game-data';

export default class MainResult extends AbstractView {
  constructor(data, contentInfo) {
    super();
    this.resultData = data;
    this.contentInfo = contentInfo;
    this.fastAnswers = this.contentInfo.fastAnswers.length;
  }

  get template() {
    return (`
      <!-- Результат игры: выигрыш -->
      <section class="main main--result">
        <section class="logo" title="Угадай мелодию">
          <h1>Угадай мелодию</h1>
        </section>
        <h2 class="title">${this.contentInfo.title}</h2>
        <div class="main-stat">
          За&nbsp;${this.contentInfo.minutes}&nbsp;${convertNumberToString(this.contentInfo.minutes, stringExampleMinutes)} и
          ${this.contentInfo.seconds}&nbsp;${convertNumberToString(this.contentInfo.seconds, stringExampleSeconds)}
          <br>вы&nbsp;набрали ${this.contentInfo.scores} ${convertNumberToString(this.contentInfo.scores, stringExampleScores)}
          (${this.fastAnswers} ${convertNumberToString(this.fastAnswers, stringExampleFastAnswers)})
          <br>совершив ${this.contentInfo.fails} ${convertNumberToString(this.contentInfo.fails, stringExampleFails)}</div>
        <span class="main-comparison">${this.resultData}</span>
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
