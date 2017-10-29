import AbstractView from "../view";
import Timer from '../elements/timer';
import Mistakes from '../elements/main-mistakes';
import ArtistSelection from '../artist-selection/artist-selection-view';
import GenreSelection from '../genre-selection/genre-selection-view';

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

  updateTimer(data, circleData) {
    updateMarkup(this.timer, new Timer(data, circleData));
  }

  updateMistakes(data) {
    updateMarkup(this.mistakes, new Mistakes(data));
  }

  updateArtistScreen(data) {
    updateMarkup(this.gameScreen, new ArtistSelection(data));
  }

  updateGenreScren(data) {
    updateMarkup(this.gameScreen, new GenreSelection(data));
  }
}
