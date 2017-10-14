export const calculateUserScore = (userData, userNotes) => {
  let userScore = 0;
  if (userData.right === true) {
    userScore += 1;
    if (userData.time < 30) {
      userScore += 2;
    }
  } else {
    userScore -= 1;
    userNotes = userNotes <= 0 ? 0 : userNotes - 1;
  }
  return {
    userScore,
    userNotes
  };
};

const calculateUserGameResult = (gameUserData, userNotes) => {
  if (gameUserData.length < 10) {
    return -1;
  }
  return gameUserData.reduce(((sum, current) => sum +
    calculateUserScore(current, userNotes).userScore), 0);
};

export const decisionPlayerResult = (userData, playersResult) => {
  if (userData.time <= 0) {
    return `Время вышло! Вы не успели отгадать все мелодии`;
  } else if (userData.notes <= 0) {
    return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  } else {
    playersResult.push(userData.scores);
    const playersResultLength = playersResult.length;
    const playerPosition = (playersResult.sort((a, b) => b - a)
      .indexOf(userData.scores)) + 1;
    const userResult = playersResult
        .filter((it) => it < (userData.scores)).length / playersResult.length;
    return `Вы заняли ${playerPosition}-ое место из ${playersResultLength} игроков. Это лучше чем у ${userResult * 100}% игроков.`;
  }
};

export class GameTimer {
  constructor(time = 60 * 1) {
    this.time = time;
    this.minutes = parseInt(this.time / 60, 10);
    this.seconds = parseInt(this.time % 60, 10);
    this._state = this.time;
    this.stopTimerId = null;
  }

  startTimer() {
    this.stopTimerId = setInterval(this.updateState.bind(this), 1000);
  }

  updateState() {
    this.tick();
    --this._state;

    if (this._state < 0) {
      this.stopTimer();
    }
  }

  tick() {
    this.minutes = parseInt(this._state / 60, 10);
    this.seconds = parseInt(this._state % 60, 10);
    this.minutes = this.minutes < 10 ? `0` + this.minutes : this.minutes;
    this.seconds = this.seconds < 10 ? `0` + this.seconds : this.seconds;
  }

  stopTimer() {
    clearInterval(this.stopTimerId);
    this._state = `Время закончено`;
  }

  get state() {
    return this._state;
  }
}

export const convertNumberToString = (numberCount, exampleWords) => {
  const cases = [2, 0, 1, 1, 1, 2];
  numberCount = Math.abs(numberCount);
  return exampleWords[(numberCount % 100 > 4 && numberCount % 100 < 20) ? 2 :
    cases[(numberCount % 10 < 5) ? numberCount % 10 : 5]];
};

export default calculateUserGameResult;
