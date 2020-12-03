let table = [];
for(let i = 1; i < 10; i++) {
  let arr = [];
  for(let j = 1; j < 10; j++) {
    arr.push(i * j);
  }
  table.push(arr);
}

table.forEach(e => console.log(e.join('\t')));
