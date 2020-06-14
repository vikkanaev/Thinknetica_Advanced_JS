'use strict';
const {Position} = require('../base/position.js');
const {Ship} = require('../base/ship.js');

/**
 * Класс Корабль
 * @param {string} name - имя корабля
 * @param {string} model - модель корабля
 * @param {Position} position - атуальные координаты корабля
 * @param {number} enginePower -  Мощность двигателя
 * @param {string} material -  Материал корпуса
 */
function MotorShip(name, model, position, enginePower, material) {
  if (!(position instanceof Position)) throw new Error('Wrong input. Position object required.');

  this.name = name;
  this.model = model;
  this.position = position;
  this.enginePower = enginePower;
  this.material = material;
};

MotorShip.prototype = new Ship();
module.exports = {MotorShip};
