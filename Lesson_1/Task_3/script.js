const inputDate = prompt('Plz enter date in MM/DD/YYYY format', '12/31/2020');
const date = new Date(Date.parse(inputDate + ' UTC'));
const outputDate = date.toISOString().substring(0, 10);
alert(`Ru date format is ${outputDate}`);
