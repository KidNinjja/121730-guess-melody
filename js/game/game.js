import AbstractView from "../view";
import App from '../application';
import GameView from './game-view';
import {changeView} from "../render";
import {gameTimer} from "../data/game-data";
import {gameInitialState} from "./game-initial-state";
import {gameData} from "./game-screen-info";

const getRandomItem = (collection) => {
  return collection[Math.floor(Math.random() * collection.length)];
};

const sortCollection = (collection) => {
  collection.sort((a, b) => {
    if (a.genre < b.genre) {
      return -1;
    }
    if (a.genre > b.genre) {
      return 1;
    }
    return 0;
  });
};

const getCollection = (collection) => {
  let randomRightItem = getRandomItem(collection);
  let collectionPull = null;

  sortCollection(collection);

  collectionPull = collection.filter((it) => {
    return randomRightItem.genre === it.genre;
  });

  return {
    collection: collectionPull,
    title: randomRightItem.genre
  };

};

class GameScreen extends AbstractView {
  constructor() {
    super();
    this.view = new GameView();
    this.data = {};
    this.answers = [];
  }

  init() {
    changeView(this.view);
    this.timer = gameTimer(gameInitialState.time);
    this.lifes = gameInitialState.lives;
    this.view.updateMistakes(this.lifes);

    setInterval(() => {
      this.timer.tick();
      this.view.updateTimer(this.timer.getTime());
    }, 1000);

    this.showNextQuestion();
  }

  handleAnswerGenre(answer) {
    const isRightAnswer = answer.every((element) => element === true);

    this.answers.push({
      right: isRightAnswer,
      time: this.startTime - this.timer.getTime().time
    });

    if (!isRightAnswer) {
      this.view.updateMistakes(--this.lifes);
    }

    this.showNextQuestion();
  }

  handleAnswerArtist(answer) {
    const isRightAnswer = answer === this.rightAnswer;

    this.answers.push({
      right: isRightAnswer,
      time: this.startTime - this.timer.getTime().time
    });

    if (!isRightAnswer) {
      this.view.updateMistakes(--this.lifes);
    }

    this.showNextQuestion();
  }

  showNextQuestion() {
    if (this.lifes < 1 || this.answers.length >= 10) {
      App.showMainResultScreen(this.answers);
    }

    const screenKey = Math.random() >= 0.5 ? `artistSelection` : `genreSelection`;
    const localData = gameData[screenKey];
    const list = new Set();

    while (list.size < (screenKey === `artistSelection` ? 3 : 4)) {
      list.add(getRandomItem(localData.questions));
    }

    const arr = [...list];

    this.questions = arr;
    this.startTime = this.timer.getTime().time;

    if (screenKey === `artistSelection`) {
      this.rightAnswer = getRandomItem(arr);
      this.view.updateArtistScreen({
        gameData: {
          title: localData.title,
          questions: arr
        },
        onAnswer: this.handleAnswerArtist.bind(this),
        rightAnswer: this.rightAnswer
      });
    } else if (screenKey === `genreSelection`) {
      this.rightAnswer = getCollection(arr);
      this.view.updateGenreScren({
        gameData: {
          title: localData.title(this.rightAnswer.title),
          questions: arr
        },
        onAnswer: this.handleAnswerGenre.bind(this),
        rightAnswer: this.rightAnswer
      });
    }
  }

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
  getArtists() {
    return {
      title: `Кто исполняет эту песню?`,
      questions: [
        {
          artist: `Kevin MacLeod`,
          name: `Long Stroll`,
          image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
          src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
          genre: `Jazz`,
        },
        {
          artist: `Jingle Punks`,
          name: `In the Land of Rhinoplasty`,
          image: `https://i.vimeocdn.com/portrait/992615_300x300`,
          src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
          genre: `Rock`
        },
        {
          artist: `Audionautix`,
          name: `Travel Light`,
          image: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`,
          src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
          genre: `Country`
        }
      ]
    };
  }
}

export default new GameScreen();
