import {musicPlayer} from "./music-player";

export const genreAnswer = (genreAnswerData) => {
  const randomInt = Math.round(Math.random() * 10000);
  return (`
    <div class="genre-answer">
      ${musicPlayer(genreAnswerData.src)}
      <input type="checkbox" name="answer" value="${genreAnswerData.genre}" id="a-${randomInt}">
      <label class="genre-answer-check" for="a-${randomInt}"></label>
    </div>
  `);
};
