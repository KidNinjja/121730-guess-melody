const DEFAULT_PREVIEW = `http://placehold.it/134x134`;

let idValue = 0;

export const artistAnswer = (artistAnswersData) => {
  idValue++;
  return (`
    <div class="main-answer-wrapper">
      <input class="main-answer-r" type="radio" id="answer-${idValue}" name="answer" value="${artistAnswersData.title}" />
      <label class="main-answer" for="answer-${idValue}">
        <img class="main-answer-preview"
             src="${artistAnswersData.image.url ? artistAnswersData.image.url : DEFAULT_PREVIEW}"
             width="${artistAnswersData.image.width}"
             height="${artistAnswersData.image.height}"
             alt="${artistAnswersData.title}">
        ${artistAnswersData.title}
      </label>
    </div>
  `);
};
