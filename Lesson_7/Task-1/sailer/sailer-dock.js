'use strict';
const {SailerShip} = require('./sailer-ship.js');
const {Position} = require('../base/position.js');
const {Dock} = require('../base/dock.js');

/**
 * Пристань - это место куда может приплыть корабль с целью загрузиться и разгрузиться
 * @param {Position} position - координаты
 */
function SailerDock(position = new Position(0, 0)) {
  if (!(position instanceof Position)) throw new Error('Wrong input. Position object required.');

  this.position = position;
  this.SUPPORTED_SHIP_TYPE = SailerShip;
}

SailerDock.prototype = new Dock();
module.exports = {SailerDock};
