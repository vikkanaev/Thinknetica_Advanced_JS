'use strict';

const CANVAS_TEMPLATE = 'canvasTemplate';
const CANVAS_CONTAINER = 'canvas';
const CANVAS_BODY = 'canvasBody';
const PALETTE = 'palette';
const ACTIVE_COLOR_1 = 'color1';
const ACTIVE_COLOR_2 = 'color2';

const sizeX = 20;
const sizeY = 21;
let activeColor1 = 'transparent';
let activeColor2 = 'transparent';

const nTimes = (n) => Array.from(Array(n));

createCanvas(sizeX, sizeY);

const canvas = document.getElementById(CANVAS_CONTAINER);
canvas.addEventListener('click', draw);
const palette = document.getElementById(PALETTE);
palette.addEventListener('click', setColorHandler);

/**
 * Создает холст для рисования размера X на Y клеток
 * @param {number} sizeX - размер холста по X в клетках
 * @param {number} sizeY - размер холста по Y в клетках
 */
function createCanvas(sizeX, sizeY) {
  const canvasTemplate = document.getElementById(CANVAS_TEMPLATE);
  const container = document.getElementById(CANVAS_CONTAINER);

  const canvasCopy = canvasTemplate.content.cloneNode(true);
  const canvasBody = canvasCopy.getElementById(CANVAS_BODY);

  nTimes(sizeY).forEach(() => createRow(canvasBody, sizeX));
  container.append(canvasCopy);
}

/**
 * создает одну строку холста длинной в size клеток
 * @param {HTMLElement} parent - родительский элемент
 * @param {number} size - число клеток
 */
function createRow(parent, size) {
  const newRow = parent.insertRow(0);
  nTimes(size).forEach(() => newRow.insertCell(0));
}

/**
 * Рисует/стирает точки на холсте
 * @param {MouseEvent} event событие типа клик
 */
function draw(event) {
  if (event.target.tagName !== 'TD') return;

  if (event.shiftKey) event.target.style.backgroundColor = 'transparent';
  else if (isSpecialKey(event)) event.target.style.backgroundColor = activeColor2;
  else event.target.style.backgroundColor = activeColor1;
}

/**
 * Обработчик события установки активного цвета.
 * @param {MouseEvent} event событие типа клик
 */
function setColorHandler(event) {
  const eventColor = event.target.dataset.color;

  if (event.target.tagName !== 'TD') return;
  else if (isSpecialKey(event)) {
    setColor(ACTIVE_COLOR_2, eventColor);
  } else {
    setColor(ACTIVE_COLOR_1, eventColor);
  }
}

/**
 * Устанавливает активный цвет для рисования
 * @param {string} elementId - id элемента цвет которому надо установить
 * @param {string} color - устанавливаемый цвет
 */
function setColor(elementId, color) {
  const indicator = document.getElementById(elementId);
  indicator.style.backgroundColor = color;
  elementId === ACTIVE_COLOR_1 ? activeColor1 = color : activeColor2 = color;
}

/**
 * определяет была ли нажата специальная клавиша при клике
 * @param {MouseEvent} event событие типа клик
 * @return {boolean} - да/нет
 */
function isSpecialKey(event) {
  return (event.metaKey || event.ctrlKey);
}

