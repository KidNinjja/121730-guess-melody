import AbstractView from "../view";
import Timer from '../elements/timer';
import Mistakes from '../elements/main-mistakes';
import ArtistSelection from '../artist-selection/artist-selection-view';
import GenreSelection from '../genre-selection/genre-selection-view';
import {getTimeArrayFromSeconds, getTimeLineRadiusFromSeconds} from '../utils';

const updateMarkup = (container, view) => {
  container.innerHTML = ``;
  container.appendChild(view.element);
};
/**
 * 
 * 
 * @export
 * @class GameView
 * @extends {AbstractView}
 */
export default class GameView extends AbstractView {
  /**
   * Creates an instance of GameView.
   * @param {GameModel} gameModel 
   * @memberof GameView
   */
  constructor(gameModel) {
    super();
    this.model = gameModel;
    this.timerView = new Timer();
  }

  get template() {
    return (`
      <section class="app__container">
        <div class="timer-container"></div>
        <div class="main-mistakes"></div>
        <div class="game-container"></div>
      </section>
    `);
  }

  bind() {
    this.timerContainer = this.element.querySelector(`.timer-container`);
    this.mistakesContainer = this.element.querySelector(`.main-mistakes`);
    this.gameScreenContainer = this.element.querySelector(`.game-container`);
    updateMarkup(this.timerContainer, this.timerView);
    this.updateTimer();
  }

  updateTimer() {
    const timeArray = getTimeArrayFromSeconds(this.model.time);
    const timeLine = getTimeLineRadiusFromSeconds(this.model.time);
    this.timerView.updateTime(timeArray, timeLine);
  }

  updateMistakes() {
    updateMarkup(this.mistakesContainer, new Mistakes(this.model.lives));
  }

  updateArtistScreen() {
    const view = new ArtistSelection({
      gameData: this.model.question,
      rightAnswer: this.model.rightAnswer,
      onAnswer: this.onAnswer
    });
    updateMarkup(this.gameScreenContainer, view);
  }

  updateGenreScreen() {
    const view = new GenreSelection({
      gameData: this.model.question,
      rightAnswer: this.model.rightAnswer,
      onAnswer: this.onAnswer
    });
    updateMarkup(this.gameScreenContainer, view);
  }

  updateGameScreen() {
    if (this.model.currentScreen === `artistSelection`) {
      this.updateArtistScreen();
    } else {
      this.updateGenreScreen();
    }
  }
}
