const appContainer = document.querySelector(`.app`);

export const createElement = (template) => {
  const outerTwo = document.createElement(`div`);
  outerTwo.innerHTML = template;
  return outerTwo.children[0];
};

export const changeView = (view) => {
  const outer = document.querySelector(`.main`);
  appContainer.replaceChild(view.element, outer);
};
