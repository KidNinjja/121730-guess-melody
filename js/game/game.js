import AbstractView from "../view";
import App from '../application';
import GameView from './game-view';
import GameModel from './game-model';
import {changeView} from "../render";
import calculateUserGameResult from '../data/game-data';
import {gameTimer, decisionPlayerResult} from '../data/game-data';
import {gameInitialState} from "./game-initial-state";
import {gameData} from './game-screen-info';
import {gameResult} from '../main-result/main-result-data';

const getRandomItem = (collection) => {
  return collection[Math.floor(Math.random() * collection.length)];
};

const getCollection = (collection) => {
  let randomRightItem = getRandomItem(collection);
  let collectionPull = null;

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
    this.timerId = null;
  }

  init() {
    changeView(this.view);
    this.timer = gameTimer(gameInitialState.time);
    this.lifes = gameInitialState.lives;
    this.view.updateMistakes(this.lifes);
    this.initTimer();
    this.showNextQuestion();
  }

  initTimer() {
    this.timerId = setInterval(this.updateTimer.bind(this), 1000);
  }

  updateTimer() {
    this.timer.tick();
    this.view.updateTimer(this.timer.getTime(), this.timer.updateRadius());
    if (this.timer.getTime().time === 0) {
      this.destroyTimer();
      this.showResultScreen();
    }
  }

  destroyTimer() {
    clearInterval(this.timerId);
  }

  handleAnswerGenre(answer) {
    const isRightAnswer = answer.every((element) => element === true);

    this.answers.push({
      right: isRightAnswer,
      time: this.startTime - this.timer.getTime().time,
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
      time: this.startTime - this.timer.getTime().time,
    });

    if (!isRightAnswer) {
      this.view.updateMistakes(--this.lifes);
    }

    this.showNextQuestion();
  }

  showNextQuestion() {
    if (this.lifes < 1 || this.answers.length >= 10) {
      this.destroyTimer();
      this.showResultScreen();
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

  showResultScreen() {
    const userResult = {
      scores: calculateUserGameResult(this.answers),
      notes: this.lifes,
      time: this.timer.getTime().time,
    };
    let contentInfo = {
      minutes: +this.timer.getTime().minutes,
      seconds: +this.timer.getTime().seconds,
      scores: userResult.scores,
      fastAnswers: this.answers.filter((it) => it.time < 30),
      fails: this.lifes < gameInitialState.lives ? gameInitialState.lives - this.lifes : 0
    };
    switch (true) {
      case userResult.notes < 1:
        contentInfo.title = gameResult.gameOver.title;
        break;
      case userResult.time <= 0:
        contentInfo.title = gameResult.timeLeft.title;
        break;
      default:
        contentInfo.title = gameResult.win.title;
        break;
    }
    App.showMainResultScreen(decisionPlayerResult(userResult, [4, 5, 8, 11]), contentInfo);
  }
}

export default new GameScreen();
