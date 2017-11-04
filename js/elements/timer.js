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
   * @param {Array} data 
   * @param {Object} circleData 
   * @memberof Timer
   */
  constructor(data, circleData) {
    super();
    this.data = data;
    this.circleData = circleData;
  }

  get template() {
    return (`
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
          <circle
            cx="390" cy="390" r="370"
            class="timer-line"
            stroke-dasharray="${this.circleData.dashArrayValue}"
            stroke-dashoffset="${this.circleData.dashOffsetValue}"
            style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center">
          </circle>
        </svg>
        <div class="timer-value ${+this.data[0] === 0 && +this.data[1] < 30 ? `timer-value--finished` : ``}"
            xmlns="http://www.w3.org/1999/xhtml">
            <span class="timer-value-mins">${this.data[0]}</span><!--
            --><span class="timer-value-dots">:</span><!--
            --><span class="timer-value-secs">${this.data[1]}</span>
        </div>
    </div>
    `);
  }
}
