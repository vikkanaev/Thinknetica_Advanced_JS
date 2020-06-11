const {Position} = require('./position.js');
const expect = require('chai').expect;

describe('Position', () => {
  describe('#distanceTo', () => {
    const position1 = new Position(0, 0);
    const position2 = new Position(10, 0);

    it('calculate distanceTo', () => {
      expect(position1.distanceTo(position2)).to.equal(10);
    });
  });

  describe('#eq', () => {
    describe('when equal', () => {
      const position1 = new Position(5, 1);
      const position2 = new Position(5, 1);

      it('return true', () => {
        expect(position1.eq(position2)).to.equal(true);
      });
    });

    describe('when not equal', () => {
      const position1 = new Position(0, 0);
      const position2 = new Position(10, 0);

      it('return false', () => {
        expect(position1.eq(position2)).to.equal(false);
      });
    });
  });
});
