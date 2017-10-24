import AbstractView from "../view";

export const noteTypes = {
  noteActive: `icon-note-active`,
  noteInactive: `icon-note-inactive`,
  noteWrong: `wrong-answer`
};

export default class Timer extends AbstractView {
  constructor(data) {
    super();
    this.data = data;
  }

  get template() {
    return (`
      <div>
        <img
        class="main-mistake"
        src=img/${this.data ? noteTypes.noteActive : noteTypes.noteWrong}.png
        width="35"
        height="49">
        <img
        class="main-mistake"
        src=img/${this.data > 0 ? noteTypes.noteActive : noteTypes.noteWrong}.png
        width="35"
        height="49">
        <img
        class="main-mistake"
        src=img/${this.data > 0 ? noteTypes.noteActive : noteTypes.noteWrong}.png
        width="35"
        height="49">
      </div>
    `);
  }
}
