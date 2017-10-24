import {changeView} from '../render';
import GenreSelection from './genre-selection-view';
import App from '../application';

class GenreSelectionScreen {
  constructor() {
    this.view = new GenreSelection();
  }

  init() {
    changeView(this.view);

    this.view.onStart = () => {
      App.showMainResultScreen();
    };
  }
}


export default new GenreSelectionScreen();
