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
   * @param {Object} userAnswersData 
   * @memberof MainResultModel
   */
  constructor(userAnswersData) {
    this.userAnswersData = userAnswersData;
    this.userScore = calculateUserGameResult(this.userAnswersData);
    this.spentTime = this._calculateSpentTime(0);
    this.fastAnswers = this.userAnswersData.filter((fastAnswer) => fastAnswer.time < 30).length;
    this.fails = this.userAnswersData.filter((fail) => !fail.right).length;
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

  _calculateSpentTime(startCount) {
    for (const it of this.userAnswersData) {
      startCount += it.time;
    }
    return startCount;
  }
}
