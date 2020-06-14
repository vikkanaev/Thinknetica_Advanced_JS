// const {MotorShip} = require('./motor-ship.js');
const {MotorDock} = require('./motor-dock.js');
const {Position} = require('../base/position.js');
const expect = require('chai').expect;

describe('MotorDock', () => {
  describe('#new', () => {
    it('trow error when no Position object given', () => {
      expect(() => new MotorDock({})).to.throw('Wrong input. Position object required.');
    });

    const EXPECTED_PROPERTYS = [
      'mooredShips',
      'mooredShipNames',
      'moor',
      'unmoor',
      'producedShips',
      'producedShipsNames',
      'makeNewShip',
      'paint',
      'repair',
      'exchange'];
    it('creates new MotorShip with expected propertys', () => {
      EXPECTED_PROPERTYS.forEach((prop) => {
        expect(new MotorDock(new Position(0, 0))).to.have.property(prop);
      });
    });
  });
});


