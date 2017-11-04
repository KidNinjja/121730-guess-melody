import {changeView} from '../render';
import MainResult from './main-result-view';
import MainResultModel from './main-result-model';
import App from '../application';
import Loader from '../loader';
/**
 * 
 * 
 * @class MainResultScreen
 */
class MainResultScreen {
  /**
   * 
   * 
   * @param {Object} data 
   * @memberof MainResultScreen
   */
  init(data) {
    this.model = new MainResultModel(data);
    this.view = new MainResult(this.model);
    changeView(this.view);
    this.loadData();

    this.view.onStart = () => {
      App.showWelcome();
    };
  }

  loadData() {
    Loader.getStatistics().
        then((result) => {
          this.model.updateResult(result.map((it) => it.score));
          this.view = new MainResult(this.model);
          changeView(this.view);
          this.view.onStart = () => {
            App.showWelcome();
          };
        });
  }
}

export default new MainResultScreen();
