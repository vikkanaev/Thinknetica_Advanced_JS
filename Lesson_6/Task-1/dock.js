'use strict';
const {Ship} = require('./ship.js');
const {Position} = require('./position.js');

/**
 * Пристань - это место куда может приплыть корабль с целью загрузиться и разгрузиться
 * @param {Position} position - координаты
 */
function Dock(position) {
  if (!(position instanceof Position)) throw new Error('Wrong input. Position object required.');

  this.position = position;
  this._ships = [];
  this.ships = () => this._ships;
  this.shipNames = () => this._ships.map((s) => s.name);

  this.moor = (ship) => {
    if (!(ship instanceof Ship)) throw new Error('Wrong input. Ship object required.');
    if (!this.position.eq(ship.position)) throw new Error('You can`t moor ship when ship not in dock');
    if (this.shipNames().includes(ship.name)) throw new Error('This ship already moored.');

    ship.dropAnchor();
    this._ships.push(ship);
    return true;
  };

  this.unmoor = (ship) => {
    if (!(ship instanceof Ship)) throw new Error('Wrong input. Ship object required.');
    if (!this.shipNames().includes(ship.name)) throw new Error('This ship is not moored yet.');

    ship.riseAnchor();
    this._ships = this._ships.filter((s) => s.name !== ship.name);
    return true;
  };
}

module.exports = {Dock};
