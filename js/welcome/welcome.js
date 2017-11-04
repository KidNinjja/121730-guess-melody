import {changeView} from '../render';
import WelcomeView from './welcome-view';
import App from '../application';
/**
 * 
 * 
 * @class WelcomeScreen
 */
class WelcomeScreen {
  /**
   * Creates an instance of WelcomeScreen.
   * @memberof WelcomeScreen
   */
  constructor() {
    this.view = new WelcomeView();
  }

  init() {
    changeView(this.view);

    this.view.onStart = () => {
      App.showGame();
    };
  }
}

export default new WelcomeScreen();
