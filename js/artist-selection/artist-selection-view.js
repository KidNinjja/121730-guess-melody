import AbstractView from '../view';
// import {mistakes} from '../elements/main-mistakes';
import {musicPlayer} from '../elements/music-player';
import {mainAnswer} from '../elements/main-answer';
// ${/*this.state.lives.map((it) => mistakes(it)).join(``)*/}
export default class ArtistSelection extends AbstractView {

  get template() {
    return (`
      <!-- Игра на выбор исполнителя -->

      <section class="main main--level main--level-artist">
        

        <div class="main-wrap">
          <h2 class="title main-title">${this.data.title}</h2>

            ${musicPlayer(this.data.questions[2].src)}

          <form class="main-list">

            ${this.data.questions.map((it) => mainAnswer(it)).join(``)}

          </form>
        </div>
      </section>
    `);
  }

  bind(element) {
    const mainWrapper = element.querySelector(`.main-wrap`);
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
        this.onAnswer(this.data.questions.find((q) => q.artist === it.querySelector(`input`).value));
      };
    });
  }

  onStart() {}

}
