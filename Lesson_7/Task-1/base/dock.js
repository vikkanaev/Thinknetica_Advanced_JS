'use strict';
const {Ship} = require('./ship.js');
const {Position} = require('./position.js');

/**
 * Пристань - это место куда может приплыть корабль с целью загрузиться и разгрузиться
 * @param {Position} position - координаты
 */
function Dock(position = new Position(0, 0)) {
  if (!(position instanceof Position)) throw new Error('Wrong input. Position object required.');

  this.position = position;
  this.SUPPORTED_SHIP_TYPE = Ship;
  this._mooredShips = [];

  this.mooredShips = function() {
    return this._mooredShips;
  };

  this.mooredShipNames = function() {
    return this._mooredShips.map((s) => s.name);
  };

  this.moor = function(ship) {
    if (!(ship instanceof Ship)) throw new Error('Wrong input. Ship object required.');
    if (!this.position.eq(ship.position)) throw new Error('You can`t moor ship when ship not in dock');
    if (this.mooredShipNames().includes(ship.name)) throw new Error('This ship already moored.');

    ship.dropAnchor();
    this._mooredShips.push(ship);
    return true;
  };

  this.unmoor = function(ship) {
    if (!(ship instanceof Ship)) throw new Error('Wrong input. Ship object required.');
    if (!this.mooredShipNames().includes(ship.name)) throw new Error('This ship is not moored yet.');

    ship.riseAnchor();
    this._mooredShips = this._mooredShips.filter((s) => s.name !== ship.name);
    return true;
  };

  this._producedShips = [];

  this.producedShips = function() {
    return this._producedShips;
  };

  this.producedShipsNames = function() {
    return this._producedShips.map((s) => s.name);
  };

  this.makeNewShip = function(name, model, ...theArgs) {
    if (this.producedShipsNames().includes(name)) throw new Error('This ship name already exists.');

    const newShip = new this.SUPPORTED_SHIP_TYPE(name, model, this.position, ...theArgs);
    this._producedShips.push(newShip);
    return newShip;
  };

  this.paint = function(ship, color) {
    if (!this.position.eq(ship.position) || !this.mooredShipNames().includes(ship.name)) {
      throw new Error('Dock can`t paint not moored in it ships');
    }
    ship.color = color;
    return true;
  };

  this.repair = function(ship) {
    if (!(ship instanceof this.SUPPORTED_SHIP_TYPE)) {
      throw new Error(`Dock can repair only ${this.SUPPORTED_SHIP_TYPE.name}`);
    }
    if (!this.position.eq(ship.position) || !this.mooredShipNames().includes(ship.name)) {
      throw new Error('Dock can`t repair not moored in it ships');
    }

    console.log(`Repairing ${ship.name}`);
    ship.isBroken = false;
    return true;
  };

  this.exchange = function(ship, name, model, ...theArgs) {
    if (!(ship instanceof this.SUPPORTED_SHIP_TYPE)) {
      throw new Error(`Dock can exchange only ${this.SUPPORTED_SHIP_TYPE.name}`);
    }
    if (!this.position.eq(ship.position) || !this.mooredShipNames().includes(ship.name)) {
      throw new Error('Dock can`t exchange not moored in it ships');
    }

    return this.makeNewShip(name, model, ...theArgs);
  };
}

module.exports = {Dock};
