import AbstractView from '../view';
import {genreAnswer} from "../elements/genre-answer";
/**
 * 
 * 
 * @export
 * @class GenreSelection
 * @extends {AbstractView}
 */
export default class GenreSelection extends AbstractView {
  /**
   * Creates an instance of GenreSelection.
   * @param {Object} data 
   * @memberof GenreSelection
   */
  constructor(genreQuestionsData) {
    super();
    this.genreQuestionsData = genreQuestionsData.gameData;
    this.onAnswer = genreQuestionsData.onAnswer;
    this.rightAnswer = genreQuestionsData.rightAnswer;
  }

  get template() {
    return (`
      <!-- Игра на выбор жанра -->
      <section class="main main--level main--level-genre">
        <div class="main-wrap">
          <h2 class="title">${this.genreQuestionsData.title}</h2>
          <form class="genre">
                ${this.genreQuestionsData.questions.answers.map((answer) => genreAnswer(answer)).join(``)}
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

    actionButton.disabled = true;

    for (const playerActionButton of playerActionButtons) {
      playerActionButton.onclick = (event) => {
        event.preventDefault();

        const targetPreviousElement = event.target.previousElementSibling;

        event.target.classList.toggle(`player-control--pause`);

        if (targetPreviousElement.paused) {
          for (const audioElement of audioElements) {
            if (!audioElement.paused) {
              audioElement.nextElementSibling.classList.toggle(`player-control--pause`);
              audioElement.pause();
            }
          }
          targetPreviousElement.play();
        } else {
          targetPreviousElement.pause();
        }
      };
    }

    for (const answerActionButton of answerActionButtons) {
      answerActionButton.onclick = (event) => {

        const targetPreviousElement = event.target.previousElementSibling;

        if (!targetPreviousElement.checked) {
          answersCollection.add(targetPreviousElement.value);
          actionButton.disabled = false;
        } else {
          answersCollection.delete(targetPreviousElement.value);
          if (answersCollection.size < 1) {
            actionButton.disabled = true;
          } else {
            actionButton.disabled = false;
          }
        }
      };
    }

    actionButton.onclick = (event) => {
      event.preventDefault();
      this.onAnswer([...answersCollection].every((answersCollectionElement) => answersCollectionElement === this.rightAnswer));
    };
  }

  onStart() {}
}
