import WelcomeScreen from './welcome/welcome';
import MainResultScreen from './main-result/main-result';
import GameScreen from './game/game';
import {gameInitialState} from "./game/game-initial-state";

const ControllerId = {
  WELCOME: ``,
  GAME: `game`,
  SCORE: `result`
};

const saveState = (state) => {
  return JSON.stringify(state);
};

const routes = {
  [ControllerId.WELCOME]: WelcomeScreen,
  [ControllerId.GAME]: GameScreen,
  [ControllerId.SCORE]: MainResultScreen
};

const loadState = (dataString) => {
  try {
    return JSON.parse(dataString);
  } catch (e) {
    return gameInitialState;
  }
};

export default class Application {
  static init() {
    const hashChangeHandler = () => {
      const hashValue = location.hash.replace(`#`, ``);
      const [id, data] = hashValue.split(`?`);
      this.changeHash(id, data);
    };
    window.onhashchange = hashChangeHandler;
    hashChangeHandler();
  }

  static changeHash(id, data) {
    const controller = routes[id];
    if (controller) {
      controller.init(loadState(data));
    }
  }

  static showWelcome() {
    location.hash = ControllerId.WELCOME;
  }

  static showGame() {
    location.hash = `${ControllerId.GAME}`;
  }

  static showMainResultScreen(state) {
    location.hash = `${ControllerId.SCORE}?${saveState(state)}`;
  }
}

Application.init();
