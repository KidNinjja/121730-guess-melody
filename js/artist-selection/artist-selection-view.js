import AbstractView from '../view';
import {musicPlayer} from '../elements/music-player';
import {artistAnswer} from '../elements/artist-answer';
/**
 * 
 * 
 * @export
 * @class ArtistSelection
 * @extends {AbstractView}
 */
export default class ArtistSelection extends AbstractView {
  /**
   * Creates an instance of ArtistSelection.
   * @param {Object} data 
   * @memberof ArtistSelection
   */
  constructor(data) {
    super();
    this.data = data.gameData;
    this.onAnswer = data.onAnswer;
    this.rightAnswer = data.rightAnswer;
  }

  get template() {
    return (`
      <!-- Игра на выбор исполнителя -->

      <section class="main main--level main--level-artist">
        <div class="main-wrap">
          <h2 class="title main-title">${this.data.title}</h2>
          ${musicPlayer(this.data.questions.src)}
          <form class="main-list">
            ${this.data.questions.answers.map((it) => artistAnswer(it)).join(``)}
          </form>
        </div>
      </section>
    `);
  }

  bind() {
    const mainWrapper = this.element.querySelector(`.main-wrap`);
    const playerActionButton = mainWrapper.querySelector(`.player-control`);
    const audioElement = mainWrapper.querySelector(`audio`);
    const actionButtons = mainWrapper.querySelectorAll(`.main-answer-wrapper`);

    mainWrapper.onclick = (event) => {
      event.preventDefault();

      if (event.target === playerActionButton) {
        event.target.classList.toggle(`player-control--pause`);
        if (audioElement.paused) {
          audioElement.play();
        } else {
          audioElement.pause();
        }
      }
    };

    [...actionButtons].forEach((it) => {
      it.onclick = () => {
        const answer = this.data.questions.answers.find((q) => q.title === it.querySelector(`input`).value);
        this.onAnswer(answer.title === this.rightAnswer);
      };
    });
  }

  onStart() {}

}
