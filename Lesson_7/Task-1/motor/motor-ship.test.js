const {MotorShip} = require('./motor-ship.js');
const {Position} = require('../base/position.js');
const expect = require('chai').expect;

describe('MotorShip', () => {
  describe('#new', () => {
    it('trow error when no Position object given', () => {
      expect(() => (new MotorShip('Titanic', 'li', {}, 1, 'steal'))).to.throw('Wrong input. Position object required.');
    });

    const EXPECTED_PROPERTYS = ['dropAnchor', 'isAnchorDroped', 'riseAnchor', 'distance', 'moveTo', 'move'];
    it('creates new MotorShip with expected propertys', () => {
      EXPECTED_PROPERTYS.forEach((prop) => {
        expect(new MotorShip('Titanic', 'liner', new Position(0, 0), 100500, 'steal')).to.have.property(prop);
      });
    });

    const EXPECTED_OWN_PROPERTYS = ['enginePower', 'material', 'model', 'name', 'position'];
    it('creates new MotorShip with expected own propertys', () => {
      EXPECTED_OWN_PROPERTYS.forEach((prop) => {
        expect(new MotorShip('Titanic', 'liner', new Position(0, 0), 100500, 'steal')).to.have.property(prop);
      });
    });
  });
});


