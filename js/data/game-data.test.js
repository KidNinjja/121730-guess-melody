import assert from 'assert';
import {calculateUserScore} from './game-data.js';
import {decisionPlayerResult} from './game-data.js';
import {GameTimer} from './game-data.js';
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

const userNotesCount = 1;

const anotherGamersData = [4, 5, 8, 11];

const BaseGameTime = {
  baseTime: 1
};

describe(`calculateUserScore`, () => {
  it(`must return 3 if the player answered correctly and quickly`, () => {
    const result = calculateUserScore(testRightAndFast);
    assert.equal(3, result.userScore, `Количесво баллов ${result}`);
  });

  it(`must return 1 if the player answered correctly but slowly`, () => {
    const result = calculateUserScore(testRightAndSlow);
    assert.equal(1, result.userScore, `Количесво баллов ${result}`);
  });

  it(`must return -1 if the player did not answer correctly and quickly`, () => {
    const result = calculateUserScore(testDontRightAndFast);
    assert.equal(-1, result.userScore, `Количесво баллов ${result}`);
  });

  it(`must return -1 if the player did not answer correctly and slowly`, () => {
    const result = calculateUserScore(testDontRightAndSlow);
    assert.equal(-1, result.userScore, `Количесво баллов ${result}`);
  });
  it(`if the player fails, he loses one life point. must return 0`, () => {
    const result = calculateUserScore(testDontRightAndSlow, userNotesCount);
    assert.equal(0, result.userNotes, `Количесво баллов ${result}`);
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
    const testStringExample = `Время вышло! Вы не успели отгадать все мелодии`;
    const result = decisionPlayerResult(userResultData, anotherGamersData);
    assert.equal(testStringExample, result, `Результат ${result}`);
  });

  it(`must return result string example if the player ran out of attempts`, () => {
    const userResultData = {
      time: 2500,
      notes: 0,
      scores: 10
    };
    const testStringExample = `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
    const result = decisionPlayerResult(userResultData, anotherGamersData);
    assert.equal(testStringExample, result, `Результат ${result}`);
  });
});

describe(`GameTimer`, () => {
  const newGameTime = new GameTimer(BaseGameTime.baseTime);
  newGameTime.startTimer();
  it(`should return cont -1 without error`, (done) => {
    setTimeout(() => {
      done();
      assert.equal(0, newGameTime.state, `Время! ${newGameTime.state}`);
    }, 1000);
  });
  it(`should return string example when time is over`, (done) => {
    setTimeout(() => {
      done();
      assert.equal(`Время закончено`, newGameTime.state, `Время! ${newGameTime.state}`);
    }, 1000);
  });
});
