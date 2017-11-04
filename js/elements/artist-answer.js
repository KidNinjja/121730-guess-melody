const defaultPreview = `http://placehold.it/134x134`;

let idValue = 0;

export const artistAnswer = (data) => {
  idValue++;
  return (`
    <div class="main-answer-wrapper">
      <input class="main-answer-r" type="radio" id="answer-${idValue}" name="answer" value="${data.title}" />
      <label class="main-answer" for="answer-${idValue}">
        <img class="main-answer-preview"
             src="${data.image.url ? data.image.url : defaultPreview}"
             width="${data.image.width}"
             height="${data.image.height}"
             alt="${data.title}">
        ${data.title}
      </label>
    </div>
  `);
};
