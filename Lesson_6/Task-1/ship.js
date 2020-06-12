'use strict';
const {Position} = require('./position.js');

/**
 * Класс Корабль
 * @param {string} name - имя корабля
 * @param {string} model - модель корабля
 * @param {Position} position - атуальные координаты корабля
 */
function Ship(name, model, position ) {
  if (!(position instanceof Position)) throw new Error('Wrong input. Position object required.');

  this.name = name;
  this.position = position;
  this._isAnchorDropped = false;
  this.isAnchorDroped = () => this._isAnchorDropped;
  this.dropAnchor = () => {
    if (this._isAnchorDropped) throw new Error('Anchor is already dropped.');
    this._isAnchorDropped = true;
    return true;
  };

  this.riseAnchor = () => {
    if (!this._isAnchorDropped) throw new Error('Anchor is already raised.');
    this._isAnchorDropped = false;
    return true;
  };

  this._traveledDistance = 0;
  this.distance = () => this._traveledDistance;

  this.moveTo = (newPosition) => {
    if (!(newPosition instanceof Position)) throw new Error('Wrong input. Position object required.');
    if (this.isAnchorDroped()) throw new Error('You need to raise anchor');
    this._traveledDistance += this.position.distanceTo(newPosition);
    this.position = newPosition;
    return true;
  };

  this.move = (direction) => {
    let newPosition;
    switch (direction) {
      case 'n':
        newPosition = new Position(this.position.x, this.position.y + 1);
        break;
      case 'w':
        newPosition = new Position(this.position.x - 1, this.position.y);
        break;
      case 's':
        newPosition = new Position(this.position.x, this.position.y - 1);
        break;
      case 'e':
        newPosition = new Position(this.position.x + 1, this.position.y);
        break;
      default:
        throw new Error(`Unsuportet directon: ${direction}`);
    }
    return this.moveTo(newPosition);
  };
}

module.exports = {Ship};
