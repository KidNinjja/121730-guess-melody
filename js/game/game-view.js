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

export default class GameView extends AbstractView {
  constructor(gameModel) {
    super();
    this.model = gameModel;
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
    this.timer = this.element.querySelector(`.timer-container`);
    this.mistakes = this.element.querySelector(`.main-mistakes`);
    this.gameScreen = this.element.querySelector(`.game-container`);
  }

  updateTimer() {
    const timeString = getTimeArrayFromSeconds(this.model.time);
    const timeLine = getTimeLineRadiusFromSeconds(this.model.time);
    updateMarkup(this.timer, new Timer(timeString, timeLine));
  }

  updateMistakes() {
    updateMarkup(this.mistakes, new Mistakes(this.model.lifes));
  }

  updateArtistScreen() {
    const view = new ArtistSelection({
      gameData: this.model.question,
      rightAnswer: this.model.rightAnswer,
      onAnswer: this.onAnswer
    });
    updateMarkup(this.gameScreen, view);
  }

  updateGenreScren() {
    const view = new GenreSelection({
      gameData: this.model.question,
      rightAnswer: this.model.rightAnswer,
      onAnswer: this.onAnswer
    });
    updateMarkup(this.gameScreen, view);
  }

  updateGameScreen() {
    if (this.model.currentScreen === `artistSelection`) {
      this.updateArtistScreen();
    } else {
      this.updateGenreScren();
    }
  }
}
