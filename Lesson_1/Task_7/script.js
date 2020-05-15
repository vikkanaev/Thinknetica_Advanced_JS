let text = prompt('Plz enter some text', '  Mary    had a    little lamb');

while(text.search(/  /) != -1) {
  text = text.replace(/  /g, " ");
}
console.log(text);
