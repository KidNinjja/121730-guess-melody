import WelcomeScreen from './welcome/welcome';
import MainResultScreen from './main-result/main-result';
import GameScreen from './game/game';
import Loader from './loader';
import {dataAdapter} from './data/answers-data-adapter';

/**
 * 
 * 
 * @export
 * @class Application
 */

export default class Application {
  static init(answersData) {
    this.data = answersData;
  }

  static showWelcome() {
    WelcomeScreen.init();
  }

  static showGame() {
    GameScreen.init(this.data);
  }

  static showMainResultScreen(data) {
    MainResultScreen.init(data);
  }
}

Loader.loadData().
    then(dataAdapter).
    then((answersData) => Application.init(answersData));
