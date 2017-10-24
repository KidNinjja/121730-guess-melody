import AbstractView from "../view";

export default class Timer extends AbstractView {
  constructor(data) {
    super();
    this.data = data;
  }

  get template() {
    return (`
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
          <circle
            cx="390" cy="390" r="370"
            class="timer-line"
            style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
        </svg>
        <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
            <span class="timer-value-mins">${this.data.minutes}</span><!--
            --><span class="timer-value-dots">:</span><!--
            --><span class="timer-value-secs">${this.data.seconds}</span>
        </div>
    </div>
    `);
  }
}
