export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function generateData() {
  const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const data = [];

  const nDatapoints = getRandomInt(5, 44);
  // const nDatapoints = 10;

  const dataMin = getRandomInt(3, 100);
  const dataMax = getRandomInt(dataMin, 1000);

  for (let index = 0; index < nDatapoints; index++) {
    data.push({
      category: alpha[index],
      value: getRandomInt(dataMin, dataMax),
    });
  }
  return data;
}
