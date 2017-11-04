import AbstractView from "../view";

export const noteTypes = {
  noteActive: `icon-note-active`,
  noteWrong: `wrong-answer`
};
/**
 * 
 * 
 * @export
 * @class Mistakes
 * @extends {AbstractView}
 */
export default class Mistakes extends AbstractView {
  /**
   * Creates an instance of Mistakes.
   * @param {Array} data 
   * @memberof Mistakes
   */
  constructor(data) {
    super();
    this.lifes = data;
  }

  get template() {
    return (`
      
      <div>
        <img
        class="main-mistake"
        src=img/${this.lifes > 0 ? noteTypes.noteActive : noteTypes.noteWrong}.png
        width="35"
        height="49">
        <img
        class="main-mistake"
        src=img/${this.lifes > 1 ? noteTypes.noteActive : noteTypes.noteWrong}.png
        width="35"
        height="49">
        <img
        class="main-mistake"
        src=img/${this.lifes > 2 ? noteTypes.noteActive : noteTypes.noteWrong}.png
        width="35"
        height="49">
      </div>
    `);
  }
}
