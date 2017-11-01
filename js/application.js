import welcome from './welcome/welcome';
import mainResult from './main-result/main-result';
import game from './game/game';

export default class Application {

  static showGame() {
    game.init();
  }

  static showWelcome() {
    welcome.init();
  }

  static showMainResultScreen(data) {
    mainResult.init(data);
  }
}
