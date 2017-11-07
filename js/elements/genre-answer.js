import {musicPlayer} from "./music-player";

let idValue = 0;

export const genreAnswer = (genreAnswerData) => {
  idValue++;
  return (`
    <div class="genre-answer">
      ${musicPlayer(genreAnswerData.src)}
      <input type="checkbox" name="answer" value="${genreAnswerData.genre}" id="a-${idValue}">
      <label class="genre-answer-check" for="a-${idValue}"></label>
    </div>
  `);
};
