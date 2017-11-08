import {changeView} from '../render';
import LoaderScreenView from './loader-screen-view';
import App from '../application';
/**
 * 
 * 
 * @class LoaderScreen
 */
class LoaderScreen {
  /**
   * Creates an instance of LoaderScreen.
   * @memberof LoaderScreen
   */
  constructor() {
    this.view = new LoaderScreenView();
  }

  init() {
    changeView(this.view);

    this.view.onStart = () => {
      App.showWelcome();
    };
  }
}

export default new LoaderScreen();
