const TYPE_SCREEN = {
  ARTIST: `artist`,
  GENRE: `genre`
};

const preprocessGenreAnswers = (gameDataArray) => {
  return gameDataArray.map(({question, answers, genre}) => {
    return {title: question, answers, rightAnswer: genre};
  });
};

const getQuestions = (data, idScreen) => {
  return data.filter(({type}) => type === idScreen);
};

export const dataAdapter = (data) => {
  const artistQuestions = getQuestions(data, TYPE_SCREEN.ARTIST);
  const genreQuestions = preprocessGenreAnswers(getQuestions(data, TYPE_SCREEN.GENRE));

  return {
    artistSelection: {
      title: artistQuestions[0].question,
      questions: artistQuestions
    },
    genreSelection: {
      questions: genreQuestions
    }
  };
};
