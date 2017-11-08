import AbstractView from "../view";
/**
 * 
 * 
 * @export
 * @class Timer
 * @extends {AbstractView}
 */
export default class Timer extends AbstractView {
  /**
   * Creates an instance of Timer.
   * @param {Array} timeData 
   * @param {Array} circleData 
   * @memberof Timer
   */
  constructor(timeData, circleData) {
    super();
    this.timeData = timeData;
    this.circleData = circleData;
  }

  get template() {
    return (`
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
          <circle
            cx="390" cy="390" r="370"
            class="timer-line"
            stroke-dasharray=""
            stroke-dashoffset=""
            style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center">
          </circle>
        </svg>
        <div class="timer-value"
            xmlns="http://www.w3.org/1999/xhtml">
            <span class="timer-value-mins"></span><!--
            --><span class="timer-value-dots">:</span><!--
            --><span class="timer-value-secs"></span>
        </div>
    </div>
    `);
  }

  bind() {
    this.timerContainer = this.element.querySelector(`.timer-value`);
    this.secondsContainer = this.element.querySelector(`.timer-value-secs`);
    this.minutesContainer = this.element.querySelector(`.timer-value-mins`);
    this.circleContainer = this.element.querySelector(`circle`);
  }

  updateTime(timeArray, circleData) {
    this.minutesContainer.innerHTML = timeArray[0];
    this.secondsContainer.innerHTML = timeArray[1];
    if (+timeArray[0] === 0 && +timeArray[1] < 30 && +timeArray[1] > 0) {
      this.timerContainer.classList.add(`timer-value--finished`);
    }
    this.circleContainer.setAttribute(`stroke-dasharray`, circleData.dashArrayValue);
    this.circleContainer.setAttribute(`stroke-dashoffset`, circleData.dashOffsetValue);
  }
}
