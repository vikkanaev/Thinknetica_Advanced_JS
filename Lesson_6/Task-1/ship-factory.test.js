const {Ship} = require('./ship.js');
const {ShipFactory} = require('./ship-factory.js');
const {Position} = require('./position.js');
const expect = require('chai').expect;

describe('ShipFactory', () => {
  describe('#makeNewShip', () => {
    let factory;

    describe('when Argo not exists yet', () => {
      beforeEach(() => {
        factory = new ShipFactory();
      });

      it('makes new ship', () => {
        expect(factory.makeNewShip('Argo', 'Sailboat', new Position(0, 0))).to.be.an.instanceof(Ship);
        expect(factory._ships.length).to.equal(1);
      });

      it('trow error when no Position object given', () => {
        expect(() => factory.makeNewShip('Argo', 'Sailboat', {})).to.throw('Wrong input. Position object required.');
        expect(factory._ships.length).to.equal(0);
      });
    });

    describe('when Argo exists', () => {
      let factory;

      beforeEach(() => {
        factory = new ShipFactory();
        factory.makeNewShip('Argo', 'Sailboat', new Position(0, 0));
      });

      it('can`t create ship with same name', () => {
        expect(() => factory.makeNewShip('Argo', 'Bo', new Position(0, 0))).to.throw('This ship name already exists.');
        expect(factory._ships.length).to.equal(1);
      });
    });
  });
});
