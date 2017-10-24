const defaultPreview = `http://placehold.it/134x134`;

let idValue = 0;

export const mainAnswer = (data) => {
  idValue++;
  return (`
    <div class="main-answer-wrapper">
      <input class="main-answer-r" type="radio" id="answer-${idValue}" name="answer" value=${data.artist} />
      <label class="main-answer" for="answer-${idValue}">
        <img class="main-answer-preview"
             src=${data.image ? data.image : defaultPreview}
             width="134"
             height="134"
             alt=${data.image}>
        ${data.name}
      </label>
    </div>
  `);
};
