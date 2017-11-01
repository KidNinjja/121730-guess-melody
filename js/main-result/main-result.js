import {changeView} from '../render';
import MainResult from './main-result-view';
import MainResultModel from './main-result-model';
import App from '../application';

class MainResultScreen {
  constructor() {
    this.view = null;
    this.model = null;
  }

  init(data) {
    this.model = new MainResultModel(data);
    this.view = new MainResult(this.model);
    changeView(this.view);

    this.view.onStart = () => {
      App.showWelcome();
    };
  }
}

export default new MainResultScreen();
