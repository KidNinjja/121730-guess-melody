import AbstractView from '../view';
import App from '../application';
import {convertNumberToString, stringExampleMinutes, stringExampleSeconds, stringExampleScores, stringExampleFastAnswers, stringExampleFails} from '../data/game-data';
import {getTimeArrayFromSeconds} from '../utils';
import {GameResultTitle} from './main-result-data';
import Loader from '../loader';
/**
 * 
 * 
 * @export
 * @class MainResult
 * @extends {AbstractView}
 */
export default class MainResult extends AbstractView {
  /**
   * Creates an instance of MainResult.
   * @param {Object} userAnswersData 
   * @memberof MainResult
   */
  constructor(userAnswersData) {
    super();
    this.userAnswersData = userAnswersData;
    [this.minutes, this.seconds] = getTimeArrayFromSeconds(this.userAnswersData.spentTime);
    this.winTemplate = (`
      <h2 class="title">${GameResultTitle.WIN}</h2>
      <div class="main-stat">
        За ${this.minutes} ${convertNumberToString(this.minutes, stringExampleMinutes)} и
        ${this.seconds} ${convertNumberToString(this.seconds, stringExampleSeconds)}
        <br>вы набрали ${this.userAnswersData.userScore} ${convertNumberToString(this.userAnswersData.userScore, stringExampleScores)}
        (${this.userAnswersData.fastAnswers} ${convertNumberToString(this.userAnswersData.fastAnswers, stringExampleFastAnswers)})
        <br>совершив ${this.userAnswersData.fails} ${convertNumberToString(this.userAnswersData.fails, stringExampleFails)}
      </div>
      <span class="main-comparison">${this.userAnswersData.result}</span>
    `);
    this.loseTemplate = (`
    <h2 class="title">${this.userAnswersData.fails === 3 ? GameResultTitle.GAME_OVER : GameResultTitle.TIME_LEFT}</h2>
      <div class="main-stat">
        <span class="main-comparison">${this.userAnswersData.result}</span></br>
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
        ${this.userAnswersData.fails === 3 || this.userAnswersData.spentTime <= 0 ? this.loseTemplate : this.winTemplate }
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

    if (this.userAnswersData.fails > 0 || this.userAnswersData.spentTime > 0) {
      Loader.saveResults({score: this.userAnswersData.userScore});
    }
  }

  onStart() {}
}
