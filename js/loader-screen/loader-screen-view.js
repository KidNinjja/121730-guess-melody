import AbstractView from '../view';

export default class LoaderScreenView extends AbstractView {

  get template() {
    return (`
      <div class="main">
        <div class="loader-screen">
          <div class="loader-screen__content">Загрузка<span class="loader-screen__content--animate">...</span></div>
        </div>
      </div>
    `);
  }
}
