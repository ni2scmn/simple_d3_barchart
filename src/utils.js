export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function generateData() {
  const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const data = [];

  const nDatapoints = getRandomInt(5, 44);
  // let nDatapoints = 15;

  for (let index = 0; index < nDatapoints; index++) {
    data.push({
      category: alpha[index],
      value: getRandomInt(3, 20),
    });
  }
  return data;
}
