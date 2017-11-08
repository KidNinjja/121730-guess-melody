import {gameInitialState} from "./game-initial-state";
import {getRandomItem} from '../utils';

const GAME_SCREEN_TYPE = {
  artist: `artistSelection`,
  genre: `genreSelection`
};

/**
 * 
 * 
 * @export
 * @class GameModel
 */
export default class GameModel {
  /**
   * Creates an instance of GameModel.
   * @param {Array} questionsData 
   * @memberof GameModel
   */
  constructor(questionsData) {
    this.data = questionsData;
    this.lives = gameInitialState.lives;
    this.answers = [];
    this.startTime = 0;
    this.time = 0;
    this.rightAnswer = null;
    this.question = null;
    this.currentScreen = null;
  }

  decLife() {
    this.lives -= 1;
  }

  addAnswer(right) {
    const time = this.startTime - this.time;
    this.answers.push({right, time});
  }

  setRandomQuestion() {
    this.currentScreen = Math.random() >= 0.5 ? GAME_SCREEN_TYPE.genre : GAME_SCREEN_TYPE.artist;
    const localQuestionsData = this.data[this.currentScreen];

    const questions = getRandomItem(localQuestionsData.questions);
    if (this.currentScreen === GAME_SCREEN_TYPE.artist) {
      this.rightAnswer = questions.answers.find((questionsAnswer) => questionsAnswer.isCorrect).title;
      this.question = {
        title: localQuestionsData.title
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
