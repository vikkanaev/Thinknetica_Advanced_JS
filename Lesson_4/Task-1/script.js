/* eslint-disable guard-for-in */
console.log('Способ 1: рекурсивная итерация псевдомасива element.children');
childrenRecursion(document.body, 0);

console.log('Способ 2: обход дерева');
findNextElement(document.body, 0);

console.log('Способ 3: рекурсивная итерация псевдомасива element.children с for of');
forOf(document.body, 0);

console.log('Способ 4: рекурсивная итерация псевдомасива element.children с for in');
forIn(document.body, 0);


/**
 * Вывод элементов тела HTML способ 1
 * @param {HTMLElement} element - HTML элемент
 * @param {number} level - уровень элемента в иерархии html документа
 */
function childrenRecursion(element, level) {
  console.log('-'.repeat(level) + '>' + element.localName);
  if (element.children.length > 0) Array.from(element.children).forEach((a) => childrenRecursion(a, level + 1));
}

/**
 * Вывод элементов тела HTML способ 2
 * @param {*} element - HTML элемент
 * @param {*} level - уровень элемента в иерархии html документа
 * @param {*} direction - направление двежения по дереву. 1 - вниз, 0 - вверх
 */
function findNextElement(element, level, direction = 1) {
  console.log('-'.repeat(level) + '>' + element.localName);
  if (element.childElementCount > 0 && direction === 1) {
    findNextElement(element.firstElementChild, level + 1);
  } else if (element.nextElementSibling !== null) {
    findNextElement(element.nextElementSibling, level);
  } else if (element.parentElement.nextElementSibling !== null) {
    findNextElement(element.parentElement.nextElementSibling, level - 1);
  } else {
    if (element.parentElement.localName === 'body') return;
    findNextElement(element.parentElement, level - 1, 0);
  }
}

/**
 * Вывод элементов тела HTML способ 3
 * @param {HTMLElement} element - HTML элемент
 * @param {number} level - уровень элемента в иерархии html документа
 */
function forOf(element, level) {
  console.log('-'.repeat(level) + '>' + element.localName);
  if (element.children.length > 0) {
    const arr = Array.from(element.children);
    for (const a of arr) childrenRecursion(a, level + 1);
  }
}

/**
 * Вывод элементов тела HTML способ 4
 * @param {HTMLElement} element - HTML элемент
 * @param {number} level - уровень элемента в иерархии html документа
 */
function forIn(element, level) {
  console.log('-'.repeat(level) + '>' + element.localName);
  if (element.children.length > 0) {
    const arr = Array.from(element.children);
    for (const i in arr) childrenRecursion(arr[i], level + 1);
  }
}
