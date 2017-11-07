let collectionExample = {
  artistSelection: {
    title: ``,
    questions: []
  },
  genreSelection: {
    questions: []
  }
};

const TYPE_SCREEN = {
  ARTIST: `artist`,
  GENRE: `genre`
};

const preprocessArtistAnswers = (data) => {
  for (const {answers, question, src} of data) {
    const exampleObject = {};
    collectionExample.artistSelection.title = question;
    exampleObject.src = src;
    exampleObject.answers = answers;
    collectionExample.artistSelection.questions.push(exampleObject);
  }
  return collectionExample;
};

const preprocessGenreAnswers = (data) => {
  for (const {question, answers, genre} of data) {
    const exampleObject = {};
    exampleObject.title = question;
    exampleObject.answers = answers;
    exampleObject.rightAnswer = genre;
    collectionExample.genreSelection.questions.push(exampleObject);
  }
  return collectionExample;
};

let collection = [];

const getArtistQuestions = (data, cb) => {
  collection = [];
  for (const it of data) {
    if (it.type === TYPE_SCREEN.ARTIST) {
      collection.push(it);
    }
  }
  cb(collection);
};

const getGenreQuestions = (data, cb) => {
  collection = [];
  for (const it of data) {
    if (it.type === TYPE_SCREEN.GENRE) {
      collection.push(it);
    }
  }
  cb(collection);
};

export const dataAdapter = (data) => {
  getArtistQuestions(data, preprocessArtistAnswers);
  getGenreQuestions(data, preprocessGenreAnswers);
  return collectionExample;
};
