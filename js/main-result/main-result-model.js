import {decisionPlayerResult} from '../data/game-data';
import calculateUserGameResult from '../data/game-data';
/**
 * 
 * 
 * @export
 * @class MainResultModel
 */
export default class MainResultModel {
  /**
   * Creates an instance of MainResultModel.
   * @param {Object} data 
   * @memberof MainResultModel
   */
  constructor(data) {
    this.data = data;
    this.userScore = calculateUserGameResult(this.data);
    this.spentTime = this.calculateSpentTime(0);
    this.fastAnswers = this.data.filter((it) => it.time < 30).length;
    this.fails = this.data.filter((it) => !it.right).length;
    this.playersResult = [];
    this.result = decisionPlayerResult({
      time: this.spentTime,
      notes: 3 - this.fails,
      scores: this.userScore,
    },
    this.playersResult);
  }

  updateResult(collection) {
    this.playersResult = collection;
    this.result = decisionPlayerResult({
      time: this.spentTime,
      notes: 3 - this.fails,
      scores: this.userScore,
    },
    this.playersResult);
  }

  calculateSpentTime(startCount) {
    for (const it of this.data) {
      startCount += it.time;
    }
    return startCount;
  }
}
