import {createElement} from './render';

export default class AbstractView {

  get template() {
    throw new Error(`You have to define template for view`);
  }

  getMarkup() {
    if (!this._element) {
      this._element = this.render();
    }
    return this._element.cloneNode(true);
  }

  render() {
    return createElement(this.template);
  }

  bind() {

  }

  get element() {
    const markup = this.getMarkup();
    this.bind(markup);
    return markup;
  }

}
