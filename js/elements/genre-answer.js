import {musicPlayer} from "./music-player";

let idValue = 0;

export const genreAnswer = (data) => {
  idValue++;
  return (`
    <div class="genre-answer">
      ${musicPlayer(data.src)}
      <input type="checkbox" name="answer" value="${data.genre}" id="a-${idValue}">
      <label class="genre-answer-check" for="a-${idValue}"></label>
    </div>
  `);
};
