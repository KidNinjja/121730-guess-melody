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
   * @param {Array} questionsData 
   * @memberof GameScreen
   */
  init(questionsData) {
    this.model = new GameModel(questionsData);
    this.view = new GameView(this.model);
    this.view.onAnswer = this._handleAnswer.bind(this);
    changeView(this.view);
    this.timer = gameTimer(gameInitialState.time);
    this.model.setTime(this.timer.value);
    this.view.updateTimer();
    this.view.updateMistakes();
    this._initTimer();
    this.showNextQuestion();
  }

  _initTimer() {
    this.timerId = setInterval(this._updateTimer.bind(this), 1000);
  }

  _updateTimer() {
    if (this.timer.tick()) {
      this.model.setTime(this.timer.value);
      this.view.updateTimer();
    } else {
      this._destroyTimer();
      this.showResultScreen();
    }
  }

  _destroyTimer() {
    clearInterval(this.timerId);
  }

  _handleAnswer(isRightAnswer) {
    this.model.addAnswer(isRightAnswer);

    if (!isRightAnswer) {
      this.model.decLife();
      this.view.updateMistakes();
    }

    this.showNextQuestion();
  }

  showNextQuestion() {
    if (this.model.lives < 1 || this.model.answers.length >= 10) {
      this._destroyTimer();
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
