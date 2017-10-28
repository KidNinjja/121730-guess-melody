import AbstractView from '../view';
import {genreAnswer} from "../elements/genre-answer";

export default class GenreSelection extends AbstractView {

  constructor(data) {
    super();
    this.data = data.gameData;
    this.onAnswer = data.onAnswer;
    this.rightAnswer = data.rightAnswer;
  }

  get template() {
    return (`
      <!-- Игра на выбор жанра -->
      <section class="main main--level main--level-genre">
        <div class="main-wrap">
          <h2 class="title">${this.data.title}</h2>
          <form class="genre">
                ${this.data.questions.map((it) => genreAnswer(it)).join(``)}
            <button class="genre-answer-send" type="submit">Ответить</button>
          </form>
        </div>
      </section>
    `);
  }

  bind() {
    const actionButton = this.element.querySelector(`.genre-answer-send`);
    const playerActionButtons = this.element.querySelectorAll(`.player-control`);
    const audioElements = this.element.querySelectorAll(`audio`);
    const answerActionButtons = this.element.querySelectorAll(`.genre-answer-check`);
    const answersCollection = new Set();
    const answersBooleanSet = new Set();
    let cashe = null;

    actionButton.disabled = true;

    for (const it of playerActionButtons) {
      it.onclick = (event) => {
        event.preventDefault();

        event.target.classList.toggle(`player-control--pause`);

        if (event.target.previousElementSibling.paused) {
          for (const q of audioElements) {
            if (!q.paused) {
              q.nextElementSibling.classList.toggle(`player-control--pause`);
              q.pause();
            }
          }
          event.target.previousElementSibling.play();
        } else {
          event.target.previousElementSibling.pause();
        }
      };
    }

    for (const q of answerActionButtons) {
      q.onclick = (event) => {
        if (!event.target.previousElementSibling.checked) {
          answersCollection.add(event.target.previousElementSibling.value);
          actionButton.disabled = false;
        } else {
          actionButton.disabled = true;
          answersCollection.delete(event.target.previousElementSibling.value);
        }
      };
    }

    actionButton.onclick = (event) => {
      event.preventDefault();
      if (answersCollection.size < 2 && answersCollection.size > 0) {
        answersBooleanSet.add(answersCollection.has([...this.rightAnswer.collection][0].genre));
        this.onAnswer([...answersBooleanSet]);
      } else if (answersCollection.size > 1) {
        for (const q of this.rightAnswer.collection) {
          cashe = q.genre;

          for (const it of [...answersCollection]) {
            answersBooleanSet.add(cashe === it);
          }
        }
        this.onAnswer([...answersBooleanSet]);
      }

    };
  }

  onStart() {}
}
