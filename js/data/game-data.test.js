import assert from 'assert';
import {calculateUserScore} from './game-data.js';
import {decisionPlayerResult} from './game-data.js';
import {gameTimer} from './game-data.js';
import {convertNumberToString} from './game-data.js';
import calculateUserGameResult from './game-data.js';

const testUserData = [
  {
    right: true,
    time: 29,
  },
  {
    right: true,
    time: 29
  },
  {
    right: true,
    time: 29
  },
  {
    right: true,
    time: 29
  },
  {
    right: true,
    time: 29
  },
  {
    right: true,
    time: 29
  },
  {
    right: true,
    time: 29
  },
  {
    right: true,
    time: 29
  },
  {
    right: true,
    time: 29
  },
  {
    right: true,
    time: 29
  }
];

const testUserData2 = [
  {
    right: true,
    time: 31,
  },
  {
    right: true,
    time: 31
  },
  {
    right: true,
    time: 31
  },
  {
    right: true,
    time: 31
  },
  {
    right: true,
    time: 31
  },
  {
    right: true,
    time: 31
  },
  {
    right: true,
    time: 31
  },
  {
    right: true,
    time: 31
  },
  {
    right: true,
    time: 31
  },
  {
    right: true,
    time: 31
  }
];

const testUserData3 = [];

const testRightAndFast = {
  right: true,
  time: 29
};

const testRightAndSlow = {
  right: true,
  time: 40
};

const testDontRightAndFast = {
  right: false,
  time: 29
};

const testDontRightAndSlow = {
  right: false,
  time: 35
};

const anotherGamersData = [4, 5, 8, 11];

describe(`calculateUserScore`, () => {
  it(`must return 3 if the player answered correctly and quickly`, () => {
    const result = calculateUserScore(testRightAndFast);
    assert.equal(3, result, `Количесво баллов ${result}`);
  });

  it(`must return 1 if the player answered correctly but slowly`, () => {
    const result = calculateUserScore(testRightAndSlow);
    assert.equal(1, result, `Количесво баллов ${result}`);
  });

  it(`must return -1 if the player did not answer correctly and quickly`, () => {
    const result = calculateUserScore(testDontRightAndFast);
    assert.equal(-1, result, `Количесво баллов ${result}`);
  });

  it(`must return -1 if the player did not answer correctly and slowly`, () => {
    const result = calculateUserScore(testDontRightAndSlow);
    assert.equal(-1, result, `Количесво баллов ${result}`);
  });
});

describe(`calculateUserGameScore`, () => {
  it(`must return 30 if the player answered all the questions correctly and quickly`, () => {
    const result = calculateUserGameResult(testUserData);
    assert.equal(30, result, `Количесво баллов ${result}`);
  });

  it(`must return 10 if the player answered all the questions correctly,
      not quickly and never made a mistake`, () => {
        const result = calculateUserGameResult(testUserData2);
        assert.equal(10, result, `Количесво нот ${result}`);
      });

  it(`must return -1 if the player answered less than 10 questions`, () => {
    const result = calculateUserGameResult(testUserData3);
    assert.equal(-1, result, `Количесво баллов ${result}`);
  });
});

describe(`decisionPlayerResult`, () => {
  it(`must return result string example if the player wins`, () => {
    const userResultData = {
      time: 3000,
      notes: 2,
      scores: 10
    };
    const testStringExample = `Вы заняли 2-ое место из 5 игроков. Это лучше чем у 60% игроков.`;
    const result = decisionPlayerResult(userResultData, anotherGamersData);
    assert.equal(testStringExample, result, `Результат ${result}`);
  });

  it(`must return result string example if the player ran out of time`, () => {
    const userResultData = {
      time: 0,
      notes: 2,
      scores: 10
    };
    const testStringExample = `Время вышло!</br>Вы не успели отгадать все мелодии`;
    const result = decisionPlayerResult(userResultData, anotherGamersData);
    assert.equal(testStringExample, result, `Результат ${result}`);
  });

  it(`must return result string example if the player ran out of attempts`, () => {
    const userResultData = {
      time: 2500,
      notes: 0,
      scores: 10
    };
    const testStringExample = `У вас закончились все попытки.</br>Ничего, повезёт в следующий раз!`;
    const result = decisionPlayerResult(userResultData, anotherGamersData);
    assert.equal(testStringExample, result, `Результат ${result}`);
  });
});

describe(`gameTimer`, () => {
  it(`should return count -1 without error`, () => {
    const newGameTime = gameTimer(5);
    assert.equal(4, newGameTime.tick() ? newGameTime.value : false, `Время! ${newGameTime.value}`);
  });
  it(`should return false when time is over`, () => {
    const newGameTime = gameTimer(1);
    assert.equal(false, newGameTime.tick() ? false : newGameTime.value, `Время! ${newGameTime.value}`);
  });
});

describe(`convertNumberToString`, () => {
  const stringExampleMinutes = [
    `минута`,
    `минуты`,
    `минут`
  ];

  it(`if 1 must return минута`, () => {
    const result = convertNumberToString(1, stringExampleMinutes);
    assert.equal(`минута`, result, `Результат ${result}`);
  });

  it(`if 2 must return минуты`, () => {
    const result = convertNumberToString(2, stringExampleMinutes);
    assert.equal(`минуты`, result, `Результат ${result}`);
  });

  it(`if 5 must return минут`, () => {
    const result = convertNumberToString(5, stringExampleMinutes);
    assert.equal(`минут`, result, `Результат ${result}`);
  });

  it(`if negative 1 must return минута`, () => {
    const result = convertNumberToString(-1, stringExampleMinutes);
    assert.equal(`минута`, result, `Результат ${result}`);
  });

  it(`if negative 2 must return минуты`, () => {
    const result = convertNumberToString(-2, stringExampleMinutes);
    assert.equal(`минуты`, result, `Результат ${result}`);
  });

  it(`if negative 5 must return минут`, () => {
    const result = convertNumberToString(-5, stringExampleMinutes);
    assert.equal(`минут`, result, `Результат ${result}`);
  });
});
