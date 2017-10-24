import {changeView} from '../render';
import MainResult from './main-result-view';
import App from '../application';

class MainResultScreen {
  constructor() {
    this.view = new MainResult();
  }

  init() {
    changeView(this.view);

    this.view.onStart = () => {
      App.showWelcome();
    };
  }
}

export default new MainResultScreen();
