import AbstractView from "../view";
// import App from '../application';
import GameView from './game-view';
import {changeView} from "../render";
import {gameTimer} from "../data/game-data";
import {gameInitialState} from "./game-initial-state";
import Mistakes from '../elements/main-mistakes';

class GameScreen extends AbstractView {
  constructor() {
    super();
    this.view = new GameView();
    this.data = {};
    this.answers = [];
  }

  init() {
    changeView(this.view);
    const timer = gameTimer(gameInitialState.time);
    setInterval(() => {
      timer.tick();
      this.view.updateTimer(timer.getTime());
    }, 1000);
    this.view.updateMistakes(gameInitialState.lives);
    // this.data.artists = this.getArtists();
    //
    // this.timer = timer(300);
    //
    // App.showArtistSelection({
    //   data: this.data.artists,
    //   onAnswer: this.handleAnswer.bind(this)
    // });
  }

  // handleAnswer(answer) {
  //   this.answers.push({
  //     right: answer === this.data.artists.questions[2]
  //   });
  // }
  //
  // tick() {
  //   this.timer.tick();
  //   this.view.updateHeader();
  //
  //   this.timer = setTimeout(() => this.tick(), 1000);
  // }
  //
  // stopTimer() {
  //   clearTimeout(this.timer);
  // }
  //
  // getArtists() {
  //   return {
  //     title: `Кто исполняет эту песню?`,
  //     questions: [
  //       {
  //         artist: `Kevin MacLeod`,
  //         name: `Long Stroll`,
  //         image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
  //         src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
  //         genre: `Jazz`,
  //       },
  //       {
  //         artist: `Jingle Punks`,
  //         name: `In the Land of Rhinoplasty`,
  //         image: `https://i.vimeocdn.com/portrait/992615_300x300`,
  //         src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
  //         genre: `Rock`
  //       },
  //       {
  //         artist: `Audionautix`,
  //         name: `Travel Light`,
  //         image: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`,
  //         src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
  //         genre: `Country`
  //       }
  //     ]
  //   };
  // }
}

export default new GameScreen();
