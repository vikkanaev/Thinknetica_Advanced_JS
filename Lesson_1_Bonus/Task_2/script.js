const adZero = str => { return str.length == 1 ? `0${str}` : str }
const amPmParcer = str => { return typeof(str) == 'undefined' ? '' : str.toLowerCase() }

function timeConverter(x) {
  let timeParts = x.match(/(\d+)(\s?)+[:.-](\s?)+(\d+)(\s?)+(\w+)?/);
  let hour = adZero(timeParts[1]);
  let minites = adZero(timeParts[4]);
  let amPm = amPmParcer(timeParts[6]);

  switch (amPm) {
    case 'am':
      if(parseInt(hour) == 12) { hour = '00' }
      break;
    case 'pm':
      if(parseInt(hour) == 12) { return NaN }
      hour = `${parseInt(hour) + 12}`;
      break;
  }

  let time = new Date('1970-01-01T' + hour + ':' + minites + 'Z');
  if(time == 'Invalid Date') { return NaN }

  const options = { hour: 'numeric', minute: 'numeric', hour12: false, timeZone: 'UTC' }
  let str = new Intl.DateTimeFormat('ru-RU', options).format(time);
  return str;
}
