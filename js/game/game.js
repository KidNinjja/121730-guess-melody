import App from '../application';
import GameView from './game-view';
import GameModel from './game-model';
import {changeView} from "../render";
import {gameTimer} from '../data/game-data';
import {gameInitialState} from "./game-initial-state";
/**
 * 
 * 
 * @class GameScreen
 */
class GameScreen {
  /**
   * 
   * 
   * @param {Array} data 
   * @memberof GameScreen
   */
  init(data) {
    this.model = new GameModel(data);
    this.view = new GameView(this.model);
    this.view.onAnswer = this.handleAnswer.bind(this);
    changeView(this.view);
    this.timer = gameTimer(gameInitialState.time);
    this.model.setTime(this.timer.value);
    this.view.updateTimer();
    this.view.updateMistakes();
    this.initTimer();
    this.showNextQuestion();
  }

  initTimer() {
    this.timerId = setInterval(this.updateTimer.bind(this), 1000);
  }

  updateTimer() {
    if (this.timer.tick()) {
      this.model.setTime(this.timer.value);
      this.view.updateTimer();
    } else {
      this.destroyTimer();
      this.showResultScreen();
    }
  }

  destroyTimer() {
    clearInterval(this.timerId);
  }

  handleAnswer(isRightAnswer) {
    this.model.addAnswer(isRightAnswer);

    if (!isRightAnswer) {
      this.model.decLife();
      this.view.updateMistakes();
    }

    this.showNextQuestion();
  }

  showNextQuestion() {
    if (this.model.lifes < 1 || this.model.answers.length >= 10) {
      this.destroyTimer();
      this.showResultScreen();
    }

    this.model.setRandomQuestion();
    this.model.setStartTime(this.model.time);
    this.view.updateGameScreen();

  }

  showResultScreen() {
    App.showMainResultScreen(this.model.answers);
  }
}

export default new GameScreen();
