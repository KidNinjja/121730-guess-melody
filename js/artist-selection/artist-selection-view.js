import AbstractView from '../view';
import {musicPlayer} from '../elements/music-player';
import {artistAnswer} from '../elements/artist-answer';

export default class ArtistSelection extends AbstractView {

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
          ${musicPlayer(this.rightAnswer.src)}
          <form class="main-list">
            ${this.data.questions.map((it) => artistAnswer(it)).join(``)}
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
        const answer = this.data.questions.find((q) => q.artist === it.querySelector(`input`).value);
        this.onAnswer(answer === this.rightAnswer);
      };
    });
  }

  onStart() {}

}
