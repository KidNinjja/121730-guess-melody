import {changeView} from '../render';
import MainResult from './main-result-view';
import App from '../application';

class MainResultScreen {
  constructor() {
    this.view = null;
  }

  init(data, contentData) {
    changeView(this.view = new MainResult(data, contentData));

    this.view.onStart = () => {
      App.showWelcome();
    };
  }
}

export default new MainResultScreen();
