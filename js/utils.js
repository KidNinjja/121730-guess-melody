export const getRandomItem = (collection) => {
  return collection[Math.floor(Math.random() * collection.length)];
};

export const getTimeArrayFromSeconds = (secondsCount) => {
  let minutes = parseInt(secondsCount / 60, 10);
  let seconds = parseInt(secondsCount % 60, 10);

  minutes = minutes < 10 ? `0` + minutes : minutes;
  seconds = seconds < 10 ? `0` + seconds : seconds;

  return [minutes, seconds];
};

// TODO Переписать
export const getTimeLineRadiusFromSeconds = (secondsCount) => {
  const radiusTimeLine = 370;
  const circularСurve = Math.ceil(Math.PI * (radiusTimeLine * 2));
  let difference = (secondsCount * 100) / 300;
  const progressValue = circularСurve - (circularСurve / 100 * difference);

  return {
    dashArrayValue: circularСurve,
    dashOffsetValue: progressValue
  };
};
