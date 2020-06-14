const {SailerDock} = require('./sailer-dock.js');
const {Position} = require('../base/position.js');
const expect = require('chai').expect;

describe('MotorDock', () => {
  describe('#new', () => {
    it('trow error when no Position object given', () => {
      expect(() => new SailerDock({})).to.throw('Wrong input. Position object required.');
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
        expect(new SailerDock(new Position(0, 0))).to.have.property(prop);
      });
    });
  });
});


