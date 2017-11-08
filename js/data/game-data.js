const USER_SCORES_RULES = {
  fastAnswerToken: 30,
  maxScreensCount: 10
};

export const calculateUserScore = (userData) => {
  if (userData.right) {
    if (userData.time < USER_SCORES_RULES.fastAnswerToken) {
      return 2;
    }
    return 1;
  }
  return -1;
};

const calculateUserGameResult = (gameUserData) => {
  if (gameUserData.length < USER_SCORES_RULES.maxScreensCount) {
    return -1;
  }
  return gameUserData.reduce((sum, current) => sum + calculateUserScore(current), 0);
};

export default calculateUserGameResult;

export const decisionPlayerResult = (userData, playersResult) => {
  if (userData.time <= 0) {
    return `Время вышло!</br>Вы не успели отгадать все мелодии`;
  } else if (userData.notes <= 0) {
    return `У вас закончились все попытки.</br>Ничего, повезёт в следующий раз!`;
  }
  playersResult.push(userData.scores);
  const playersResultLength = playersResult.length;
  const playerPosition = (playersResult.sort((a, b) => b - a).indexOf(userData.scores)) + 1;
  const userResult = 1 - (playerPosition / playersResult.length);
  return `Вы заняли ${playerPosition}-ое место из ${playersResultLength} игроков. Это лучше чем у ${Math.round(userResult * 100)}% игроков.`;
};

export const gameTimer = (time) => {
  return {
    value: time,
    tick() {
      if (this.value <= 0) {
        return false;
      }
      this.value -= 1;
      return true;
    }
  };
};

export const stringExampleMinutes = [
  `минуту`,
  `минуты`,
  `минут`,
];

export const stringExampleSeconds = [
  `секунду`,
  `секунды`,
  `cекунд`
];

export const stringExampleScores = [
  `балл`,
  `балла`,
  `баллов`
];

export const stringExampleFastAnswers = [
  `быстрый`,
  `быстрых`,
  `быстрых`
];

export const stringExampleFails = [
  `ошибку`,
  `ошибки`,
  `ошибок`
];
export const convertNumberToString = (numberCount, exampleWords) => {
  const cases = [2, 0, 1, 1, 1, 2];
  numberCount = Math.abs(numberCount);
  return exampleWords[(numberCount % 100 > 4 && numberCount % 100 < 20) ? 2 :
    cases[(numberCount % 10 < 5) ? numberCount % 10 : 5]];
};
