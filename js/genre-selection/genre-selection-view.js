import AbstractView from '../view';
import {mistakes} from '../elements/main-mistakes';

export default class GenreSelection extends AbstractView {

  get template() {
    return (`
      <!-- Игра на выбор жанра -->
      <section class="main main--level main--level-genre">

        <div class="main-wrap">
          <h2 class="title">Выберите инди-рок треки</h2>
          <form class="genre">
            <div class="genre-answer">
              <div class="player-wrapper">
                <div class="player">
                  <audio></audio>
                  <button class="player-control player-control--pause"></button>
                  <div class="player-track">
                    <span class="player-status"></span>
                  </div>
                </div>
              </div>
              <input type="checkbox" name="answer" value="answer-1" id="a-1">
              <label class="genre-answer-check" for="a-1"></label>
            </div>

            <div class="genre-answer">
              <div class="player-wrapper">
                <div class="player">
                  <audio></audio>
                  <button class="player-control player-control--play"></button>
                  <div class="player-track">
                    <span class="player-status"></span>
                  </div>
                </div>
              </div>
              <input type="checkbox" name="answer" value="answer-1" id="a-2">
              <label class="genre-answer-check" for="a-2"></label>
            </div>

            <div class="genre-answer">
              <div class="player-wrapper">
                <div class="player">
                  <audio></audio>
                  <button class="player-control player-control--play"></button>
                  <div class="player-track">
                    <span class="player-status"></span>
                  </div>
                </div>
              </div>
              <input type="checkbox" name="answer" value="answer-1" id="a-3">
              <label class="genre-answer-check" for="a-3"></label>
            </div>

            <div class="genre-answer">
              <div class="player-wrapper">
                <div class="player">
                  <audio></audio>
                  <button class="player-control player-control--play"></button>
                  <div class="player-track">
                    <span class="player-status"></span>
                  </div>
                </div>
              </div>
              <input type="checkbox" name="answer" value="answer-1" id="a-4">
              <label class="genre-answer-check" for="a-4"></label>
            </div>

            <button class="genre-answer-send" type="submit">Ответить</button>
          </form>
        </div>
      </section>
    `);
  }

  bind(element) {
    const actionButton = element.querySelector(`.genre-answer-send`);
    actionButton.onclick = (event) => {
      event.preventDefault();
      this.onStart();
    };
  }

  onStart() {}
}
