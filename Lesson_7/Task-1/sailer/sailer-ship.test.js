const {SailerShip} = require('./sailer-ship.js');
const {Position} = require('../base/position.js');
const expect = require('chai').expect;

describe('SailerShip', () => {
  describe('#new', () => {
    it('trow error when no Position object given', () => {
      expect(() => (new SailerShip('Argo', 'Sailboat', {}, 1, 50))).to.throw('Wrong input. Position object required.');
    });

    const EXPECTED_PROPERTYS = ['dropAnchor', 'isAnchorDroped', 'riseAnchor', 'distance', 'moveTo', 'move'];
    it('creates new MotorShip with expected propertys', () => {
      EXPECTED_PROPERTYS.forEach((prop) => {
        expect(new SailerShip('Argo', 'Sailboat', new Position(0, 0), 1, 50)).to.have.property(prop);
      });
    });

    const EXPECTED_OWN_PROPERTYS = ['mastCount', 'totalSailArea', 'model', 'name', 'position'];
    it('creates new MotorShip with expected own propertys', () => {
      EXPECTED_OWN_PROPERTYS.forEach((prop) => {
        expect(new SailerShip('Argo', 'Sailboat', new Position(0, 0), 1, 50)).to.have.property(prop);
      });
    });
  });
});


