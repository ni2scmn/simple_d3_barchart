import * as d3 from 'd3';

export const d3Locale = d3.formatLocale({
  'decimal': '.',
  'thousands': ',',
  'grouping': [3],
  'currency': ['', '€'],
  'dateTime': '%a %b %e %X %Y',
  'date': '%m/%d/%Y',
  'time': '%H:%M:%S',
  'periods': ['AM', 'PM'],
  'days': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  'shortDays': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  'months': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  'shortMonths': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
});

export const euroFormat = d3Locale.format('$,.0f');

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function generateData() {
  const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const data = [];

  // const nDatapoints = getRandomInt(5, 44);
  const nDatapoints = 20;

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
