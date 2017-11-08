const DATA_URL = `https://es.dump.academy/guess-melody/questions`;
const SERVER_URL = `https://es.dump.academy/guess-melody/`;

const DEFAULT_NAME = `121730`;
/**
 *
 * 
 * @export
 * @class Loader
 */
export default class Loader {

  static loadData() {
    return window.fetch(`${DATA_URL}`).then((resolve) => resolve.json());
  }

  static getStatistics(name = DEFAULT_NAME) {
    return window.fetch(`${SERVER_URL}/stats/${name}`).then((resolve) => resolve.json());
  }

  static saveResults(data, name = DEFAULT_NAME) {
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}/stats/${name}`, requestSettings);
  }
}
