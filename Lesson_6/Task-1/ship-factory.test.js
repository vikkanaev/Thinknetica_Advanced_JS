const {Ship} = require('./ship.js');
const {ShipFactory} = require('./ship-factory.js');
const {Position} = require('./position.js');
const expect = require('chai').expect;

// const argo = factory.makeNewShip('Argo', 'Sailboat', new Position(0, 0));

describe('ShipFactory', () => {
  describe('#makeNewShip', () => {
    it('can`t create ship with same name', () => {
      const factory = new ShipFactory();
      factory.makeNewShip('Argo', 'Sailboat', new Position(0, 0));

      expect(() => factory.makeNewShip('Argo', 'Boat', new Position(0, 0))).to.throw('This ship name already exists.');
      expect(factory._ships.length).to.equal(1);
    });

    it('trow error when no Position object given', () => {
      const factory = new ShipFactory();

      expect(() => factory.makeNewShip('Argo', 'Sailboat', {})).to.throw('Wrong input. Position object required.');
      expect(factory._ships.length).to.equal(0);
    });

    it('makes new ship', () => {
      const factory = new ShipFactory();
      const argo = factory.makeNewShip('Argo', 'Sailboat', new Position(0, 0));

      expect(argo instanceof Ship).to.equal(true);
      expect(factory._ships.length).to.equal(1);
    });
  });
});
