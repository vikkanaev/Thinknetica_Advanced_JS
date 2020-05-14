let numbers = [];
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const sum = arr => arr.reduce(reducer);
const size = arr => arr.length;
const average = arr => sum(arr) / size(arr);
const output = arr => `Sum: ${sum(arr)}, Size: ${size(arr)}, Average: ${average(arr)}`;

while(1) {
  let input = prompt('Plz enter number', '42');
  if(input === '') { break; }

  numbers.push(parseInt(input));
  console.log(output(numbers));
}
alert(output(numbers));
