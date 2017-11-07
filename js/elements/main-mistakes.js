import AbstractView from "../view";

export const NOTE_TYPES = {
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
   * @param {Object} mistakersData 
   * @memberof Mistakes
   */
  constructor(mistakersData) {
    super();
    this.lives = mistakersData;
  }

  get template() {
    return (`
      
      <div>
        <img
        class="main-mistake"
        src=img/${this.lives > 0 ? NOTE_TYPES.noteActive : NOTE_TYPES.noteWrong}.png
        width="35"
        height="49">
        <img
        class="main-mistake"
        src=img/${this.lives > 1 ? NOTE_TYPES.noteActive : NOTE_TYPES.noteWrong}.png
        width="35"
        height="49">
        <img
        class="main-mistake"
        src=img/${this.lives > 2 ? NOTE_TYPES.noteActive : NOTE_TYPES.noteWrong}.png
        width="35"
        height="49">
      </div>
    `);
  }
}
