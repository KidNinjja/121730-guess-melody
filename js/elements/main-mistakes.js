import AbstractView from "../view";

export const NOTE_TYPES = {
  noteActive: `icon-note-active`,
  noteWrong: `wrong-answer`,
  maxNoteCount: 3
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
    const newNotesBox = new Array(NOTE_TYPES.maxNoteCount).fill(0).map((_, index) => {
      return (`
        <img
        class="main-mistake"
        src=img/${this.lives > index ? NOTE_TYPES.noteActive : NOTE_TYPES.noteWrong}.png
        width="35"
        height="49">
      `);
    });

    return `<div>${newNotesBox.join(``)}</div>`;
  }
}
