import {changeView} from '../render';
import ArtistSelectionView from './artist-selection-view';
/**
 * 
 * 
 * @class ArtistSelectionScreen
 */
class ArtistSelectionScreen {
  /**
   * Creates an instance of ArtistSelectionScreen.
   * @memberof ArtistSelectionScreen
   */
  constructor() {
    this.view = new ArtistSelectionView();
  }

  init({data, onAnswer}) {

    this.view.onAnswer = onAnswer;

    this.view.data = data;

    changeView(this.view);
  }
}

export default new ArtistSelectionScreen();
