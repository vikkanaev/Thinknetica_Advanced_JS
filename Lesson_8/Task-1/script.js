const el1 = new HtmlElement();
const target1 = document.querySelector('.container1');

const myFunc = function() {
  return 'gogog!';
};

el1.target = target1;
el1.template = `<div>{{output}} gogo {{name}}</div>`;
el1.variables = {output: myFunc, name: 'Ivan2'};
// Полюбуемся на наш елемент!
el1.render();

// А теперь мы применили стиль color: "blue", border: "10px solid black"
el1.styles = {color: 'blue', border: '10px solid black'};

// А теперь мы применили стиль color: "green"
el1.styles = {color: 'green'};

// А теперь мы поменяли переменные налету'
el1.variables = {output: 'Hello,', name: 'Ivan2'};

// А можно и шаблон налету
el1.template = `<div>Мама {{output}} Мыла {{name}} Раму!</div>`;

// Создадим второй элемент
const target2 = document.querySelector('.container2');
const el2 = new Div();
el2.target = target2;
el2.template = `<div>{{output}} gogo {{name}}</div>`;
el2.variables = {output: 'Azaza', name: "Medved"};
// Полюбуемся на наш второй елемент!'
el2.render();

el2.onClick = () => {
  console.log('test');
};
// а теперь кликните по нему

// Создадим третий элемент
const target3 = document.querySelector('.container3');
const el3 = new Input();
el3.target = target3;
el3.template = `<input></input>`;
// Полюбуемся на наш третий елемент!'
el3.render();

el3.onInput = () => {
  console.log('this is input!');
};
// проверим как обрабатывается инпут

el3.onFocus = () => {
  console.log('OMG, im in focus!');
};
// а теперь проверим фокус
