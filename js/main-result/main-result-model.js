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
    this.spentTime = this.userAnswersData.reduce(((sum, {time}) => sum + time), 0);
    this.fastAnswers = this.userAnswersData.filter((fastAnswer) => fastAnswer.time < 30).length;
    this.fails = this.userAnswersData.filter((fail) => !fail.right).length;
    this.updateResult([]);
  }

  updateResult(collection) {
    this.result = decisionPlayerResult({
      time: this.spentTime,
      notes: 3 - this.fails,
      scores: this.userScore,
    },
    collection);
  }
}
