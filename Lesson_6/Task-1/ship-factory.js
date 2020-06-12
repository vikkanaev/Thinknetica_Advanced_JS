'use strict';
const {Ship} = require('./ship.js');
const {Position} = require('./position.js');

/**
 * Фабрика по созданию новых кораблей
 */
function ShipFactory() {
  this._ships = [];
  this.ships = () => this._ships;
  this.shipNames = () => this._ships.map((s) => s.name);
  this.makeNewShip = (name, model, position) => {
    if (this.shipNames().includes(name)) throw new Error('This ship name already exists.');

    const newShip = new Ship(name, model, position);
    this._ships.push(newShip);
    return newShip;
  };
}

module.exports = {ShipFactory};
