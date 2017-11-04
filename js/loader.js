const DATA_URL = `https://es.dump.academy/guess-melody/questions`;
/**
 * xw
 * 
 * @export
 * @class Loader
 */
export default class Loader {
  static loadData() {
    return window.fetch(`${DATA_URL}`).then((resolve) => resolve.json());
  }
}
