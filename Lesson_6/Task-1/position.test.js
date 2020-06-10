const {Position} = require('./position.js');
const expect = require('chai').expect;

describe('Position', () => {
  describe('#distanceTo', () => {
    it('calculate distanceTo', () => {
      const position1 = new Position(0, 0);
      const position2 = new Position(10, 0);

      expect(position1.distanceTo(position2)).to.equal(10);
    });
  });

  describe('#eq', () => {
    it('compare two equal position', () => {
      const position1 = new Position(5, 1);
      const position2 = new Position(5, 1);

      expect(position1.eq(position2)).to.equal(true);
    });

    it('compare two not equal position', () => {
      const position1 = new Position(0, 0);
      const position2 = new Position(10, 0);

      expect(position1.eq(position2)).to.equal(false);
    });
  });
});
