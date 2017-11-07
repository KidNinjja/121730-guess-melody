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
   * @param {Object} artistQuestionsData 
   * @memberof ArtistSelection
   */
  constructor(artistQuestionsData) {
    super();
    this.artistQuestionsData = artistQuestionsData.gameData;
    this.onAnswer = artistQuestionsData.onAnswer;
    this.rightAnswer = artistQuestionsData.rightAnswer;
  }

  get template() {
    return (`
      <!-- Игра на выбор исполнителя -->

      <section class="main main--level main--level-artist">
        <div class="main-wrap">
          <h2 class="title main-title">${this.artistQuestionsData.title}</h2>
          ${musicPlayer(this.artistQuestionsData.questions.src)}
          <form class="main-list">
            ${this.artistQuestionsData.questions.answers.map((answer) => artistAnswer(answer)).join(``)}
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

    audioElement.autoplay = true;
    playerActionButton.classList.add(`player-control--pause`);

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

    Array.from(actionButtons, (actionButton) => {
      actionButton.onclick = () => {
        const answer = this.artistQuestionsData.questions.answers.find((questionsAnswer) => questionsAnswer.title === actionButton.querySelector(`input`).value);
        this.onAnswer(answer.title === this.rightAnswer);
      };
    });
  }

  onStart() {}

}
