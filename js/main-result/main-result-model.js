import {decisionPlayerResult} from '../data/game-data';
import calculateUserGameResult from '../data/game-data';

export default class MainResultModel {
  constructor(data) {
    this.data = data;
    this.userScore = calculateUserGameResult(this.data);
    this.spentTime = 0;
    this.fastAnswers = this.data.filter((it) => it.time < 30).length;
    this.fails = this.data.filter((it) => !it.right).length;
    this.playersResult = this.getPlayersResult();
    this.result = decisionPlayerResult({
      time: this.calculateSpentTime(),
      notes: 2,
      scores: this.userScore,
    },
    this.getPlayersResult());
  }

  getPlayersResult() {
    return [4, 5, 8, 11];
  }

  calculateSpentTime() {
    for (const it of this.data) {
      this.spentTime += it.time;
    }
  }
}
