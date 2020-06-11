const {Ship} = require('./ship.js');
const {Position} = require('./position.js');
const expect = require('chai').expect;

describe('Ship', () => {
  let titanic;
  beforeEach(() => {
    titanic = new Ship('Titanic', 'Olympic-class ocean liner', new Position(0, 0));
  });

  describe('#moveTo', () => {
    describe('when anchor dropped', () => {
      it('not move', () => {
        titanic.dropAnchor();
        expect(() => titanic.moveTo(new Position(1, 0))).to.throw('You need to raise anchor');
        expect(titanic.position.x).to.equal(0);
        expect(titanic.position.y).to.equal(0);
      });
    });

    describe('when anchor raised', () => {
      it('trow error when no Position object given', () => {
        expect(() => titanic.moveTo({})).to.throw('Wrong input. Position object required.');
        expect(titanic.position.x).to.equal(0);
        expect(titanic.position.y).to.equal(0);
      });

      it('can move to new position', () => {
        expect(titanic.moveTo(new Position(40, 0))).to.equal(true);
        expect(titanic.position.x).to.equal(40);
        expect(titanic.position.y).to.equal(0);
        expect(titanic._traveledDistance).to.equal(40);
      });
    });
  });

  describe('#move', () => {
    it('can move to N', () => {
      expect(titanic.move('n')).to.equal(true);
      expect(titanic.position.x).to.equal(0);
      expect(titanic.position.y).to.equal(1);
    });

    it('can move to E', () => {
      expect(titanic.move('e')).to.equal(true);
      expect(titanic.position.x).to.equal(1);
      expect(titanic.position.y).to.equal(0);
    });

    it('can move to S', () => {
      expect(titanic.move('s')).to.equal(true);
      expect(titanic.position.x).to.equal(0);
      expect(titanic.position.y).to.equal(-1);
    });

    it('can move to W', () => {
      expect(titanic.move('w')).to.equal(true);
      expect(titanic.position.x).to.equal(-1);
      expect(titanic.position.y).to.equal(0);
    });

    it('trow error when unsuported direction', () => {
      expect(() => titanic.move('up')).to.throw('Unsuportet directon: up');
      expect(titanic.position.x).to.equal(0);
      expect(titanic.position.y).to.equal(0);
    });
  });

  describe('#dropAnchor', () => {
    it('can drop anchor', () => {
      expect(titanic.dropAnchor()).to.equal(true);
      expect(titanic.isAnchorDroped()).to.equal(true);
    });

    it('trow error when Anchor is already dropped', () => {
      titanic.dropAnchor();

      expect(() => titanic.dropAnchor()).to.throw('Anchor is already dropped.');
      expect(titanic.isAnchorDroped()).to.equal(true);
    });
  });

  describe('#riseAnchor', () => {
    it('can raise anchor', () => {
      titanic.dropAnchor();

      expect(titanic.riseAnchor()).to.equal(true);
      expect(titanic.isAnchorDroped()).to.equal(false);
    });

    it('trow error when Anchor is already raised.', () => {
      expect(() => titanic.riseAnchor()).to.throw('Anchor is already raised.');
      expect(titanic.isAnchorDroped()).to.equal(false);
    });
  });

  describe('#distance', () => {
    it('show total distance', () => {
      titanic.moveTo(new Position(4, 0));

      expect(titanic.distance()).to.equal(4);
    });
  });
});
