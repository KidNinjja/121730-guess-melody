const DEFAULT_PREVIEW = `http://placehold.it/134x134`;

export const artistAnswer = (artistAnswersData) => {
  const randomInt = Math.round(Math.random() * 10000);

  return (`
    <div class="main-answer-wrapper">
      <input class="main-answer-r" type="radio" id="answer-${randomInt}" name="answer" value="${artistAnswersData.title}" />
      <label class="main-answer" for="answer-${randomInt}">
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
