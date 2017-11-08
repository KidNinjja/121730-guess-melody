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

    const minutesLabel = convertNumberToString(this.minutes, stringExampleMinutes);
    const secondLabel = convertNumberToString(this.seconds, stringExampleSeconds);
    const userScoreLabel = convertNumberToString(this.userAnswersData.userScore, stringExampleScores);
    const fastAnswersLabel = convertNumberToString(this.userAnswersData.fastAnswers, stringExampleFastAnswers);
    const scoresLabel = convertNumberToString(this.userAnswersData.fails, stringExampleFails);
    const loseTitle = this.userAnswersData.fails === 3 ? GameResultTitle.GAME_OVER : GameResultTitle.TIME_LEFT;

    this.winTemplate = (`
      <h2 class="title">${GameResultTitle.WIN}</h2>
      <div class="main-stat">
        За ${this.minutes} ${minutesLabel} и
        ${this.seconds} ${secondLabel}
        <br>вы набрали ${this.userAnswersData.userScore} ${userScoreLabel}
        (${this.userAnswersData.fastAnswers} ${fastAnswersLabel})
        <br>совершив ${this.userAnswersData.fails} ${scoresLabel}
      </div>
      <span class="main-comparison">${this.userAnswersData.result}</span>
    `);

    this.loseTemplate = (`
    <h2 class="title">${loseTitle}</h2>
      <div class="main-stat">
        <span class="main-comparison">${this.userAnswersData.result}</span></br>
      </div>
    `);
  }

  get template() {
    const winTitle = this.userAnswersData.fails === 3 || this.userAnswersData.spentTime <= 0 ? this.loseTemplate : this.winTemplate;

    return (`
      <!-- Результат игры: выигрыш -->
      <section class="main main--result">
        <section class="logo" title="Угадай мелодию">
          <h1>Угадай мелодию</h1>
        </section>
        ${winTitle}
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
