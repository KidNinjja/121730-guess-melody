import {changeView} from '../render';
import MainResult from './main-result-view';
import welcome from '../welcome/welcome';

const mainResult = new MainResult();

mainResult.onStart = () => {
  changeView(welcome());
};

export default () => mainResult;
