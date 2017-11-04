import {gameInitialState} from "./game-initial-state";
import {getRandomItem} from '../utils';
/**
 * 
 * 
 * @export
 * @class GameModel
 */
export default class GameModel {
  /**
   * Creates an instance of GameModel.
   * @param {Array} data 
   * @memberof GameModel
   */
  constructor(data) {
    this.data = data;
    this.lifes = gameInitialState.lifes;
    this.answers = [];
    this.currentQuestion = this.setRandomQuestion();
    this.startTime = 0;
    this.time = 0;
    this.rightAnswer = null;
    this.question = null;
    this.currentScreen = null;
  }

  decLife() {
    this.lifes -= 1;
  }

  addAnswer(right) {
    const time = this.startTime - this.time;
    this.answers.push({right, time});
  }

  setRandomQuestion() {
    this.currentScreen = Math.random() >= 0 ? `artistSelection` : `genreSelection`;
    const localData = this.data[this.currentScreen];

    const questions = getRandomItem(localData.questions);
    if (this.currentScreen === `artistSelection`) {
      this.rightAnswer = questions.answers.map((it) => it.isCorrect ? it.title : ``).join(``);
      this.question = {
        title: localData.title
      };
    } else {
      this.rightAnswer = questions.rightAnswer;
      this.question = {
        title: questions.title
      };
    }

    this.question.questions = questions;
  }

  setStartTime(time) {
    this.startTime = time;
  }

  setTime(time) {
    this.time = time;
  }
}
