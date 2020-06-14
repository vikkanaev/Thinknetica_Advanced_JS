'use strict';
const {Position} = require('../base/position.js');
const {Ship} = require('../base/ship.js');

/**
 * Парусный корабль Корабль
 * @param {string} name - имя корабля
 * @param {string} model - модель корабля
 * @param {Position} position - атуальные координаты корабля
 * @param {number} mastCount -  Количество мачт
 * @param {number} totalSailArea -  Общая площадь парусов
 */
function SailerShip(name, model, position, mastCount, totalSailArea) {
  if (!(position instanceof Position)) throw new Error('Wrong input. Position object required.');

  this.name = name;
  this.model = model;
  this.position = position;
  this.mastCount = mastCount;
  this.totalSailArea = totalSailArea;
};

SailerShip.prototype = new Ship();
module.exports = {SailerShip};
