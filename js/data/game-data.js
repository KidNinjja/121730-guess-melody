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

export const gameTimer = (time = 1) => {
  let localTime = time;
  let minutes = parseInt(localTime / 60, 10);
  let seconds = parseInt(localTime % 60, 10);
  let state = localTime;

  return {
    tick() {
      if (state === 0) {
        return 0;
      }

      --state;
      minutes = parseInt(state / 60, 10);
      seconds = parseInt(state % 60, 10);
      minutes = minutes < 10 ? `0` + minutes : minutes;
      seconds = seconds < 10 ? `0` + seconds : seconds;

      return state > 0 ? state : `Время закончено`;
    },
    getTime() {
      return {
        minutes,
        seconds,
        time: state
      };
    }
  };
};

export const convertNumberToString = (numberCount, exampleWords) => {
  const cases = [2, 0, 1, 1, 1, 2];
  numberCount = Math.abs(numberCount);
  return exampleWords[(numberCount % 100 > 4 && numberCount % 100 < 20) ? 2 :
    cases[(numberCount % 10 < 5) ? numberCount % 10 : 5]];
};

export default calculateUserGameResult;
