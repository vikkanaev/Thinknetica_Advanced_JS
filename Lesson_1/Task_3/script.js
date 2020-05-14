const inputDate = prompt('Plz enter date in MM/DD/YYYY format', '12/31/2020');
const date = new Date(Date.parse(inputDate + ' UTC'));
const outputDate = new Intl.DateTimeFormat('ru-RU').format(date);
alert(`Ru date format is ${outputDate}`);
