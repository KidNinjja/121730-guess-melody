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
   * @param {Object} userAnswersData 
   * @memberof MainResultScreen
   */
  init(userAnswersData) {
    this.model = new MainResultModel(userAnswersData);
    this._rerenderView();
    this._loadData();
  }

  _rerenderView() {
    this.view = new MainResult(this.model);
    changeView(this.view);

    this.view.onStart = () => {
      App.showWelcome();
    };
  }

  _loadData() {
    Loader.getStatistics().
        then((result) => {
          this.model.updateResult(result.map((reslutField) => reslutField.score));
          this._rerenderView();
        });
  }
}

export default new MainResultScreen();
