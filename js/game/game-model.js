import {gameInitialState} from "./game-initial-state";
import {gameData} from './game-screen-info';
import {getRandomItem} from '../utils';

export default class GameModel {
  constructor(data) {
    this.data = [data];
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
    this.currentScreen = Math.random() >= 0.5 ? `artistSelection` : `genreSelection`;
    const localData = gameData[this.currentScreen];
    const list = new Set();

    while (list.size < (this.currentScreen === `artistSelection` ? 3 : 4)) {
      list.add(getRandomItem(localData.questions));
    }

    const questions = [...list];

    if (this.currentScreen === `artistSelection`) {
      this.rightAnswer = getRandomItem(questions);
      this.question = {
        title: localData.title
      };
    } else {
      this.rightAnswer = getRandomItem(questions);
      this.question = {
        title: localData.title(this.rightAnswer.genre)
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
