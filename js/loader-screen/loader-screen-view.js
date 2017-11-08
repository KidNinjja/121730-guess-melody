import AbstractView from '../view';

export default class LoaderScreenView extends AbstractView {

  get template() {
    return (`
      <div>Загрузка...</div>
    `);
  }

  showErrorMessage(errorMessage) {
    this.element.textContent = errorMessage;
  }


}
