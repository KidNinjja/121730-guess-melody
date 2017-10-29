import welcome from './welcome/welcome';
// import artistSelection from './artist-selection/artist-selection';
// import genreSelection from './genre-selection/genre-selection';
import mainResult from './main-result/main-result';
import game from './game/game';

export default class Application {

  static showGame() {
    game.init();
  }

  static showWelcome() {
    welcome.init();
  }

  // static showArtistSelection(data) {
  //   artistSelection.init(data);
  // }

  // static showGenreSelection() {
  //   genreSelection.init();
  // }

  static showMainResultScreen(data, contentData) {
    mainResult.init(data, contentData);
  }
}
