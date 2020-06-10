const {Dock} = require('./dock.js');
const {Ship} = require('./ship.js');
const {Position} = require('./position.js');
const expect = require('chai').expect;

describe('Dock', () => {
  describe('#new', () => {
    it('trow error when no Position object given', () => {
      expect(() => new Dock({})).to.throw('Wrong input. Position object required.');
    });
  });

  describe('#moor', () => {
    it('trow error when no Ship object given', () => {
      const dock = new Dock(new Position(10, 10));

      expect(() => dock.moor({})).to.throw('Wrong input. Ship object required.');
    });

    it('trow error when Ship not in Dock', () => {
      const dock = new Dock(new Position(10, 10));
      const argo = new Ship('Argo', 'Sailboat', new Position(0, 0));

      expect(() => dock.moor(argo)).to.throw('You can`t moor ship when ship not in dock');
    });

    it('trow error when Ship already moored', () => {
      const dock = new Dock(new Position(0, 0));
      const argo = new Ship('Argo', 'Sailboat', new Position(0, 0));
      dock.moor(argo);

      expect(() => dock.moor(argo)).to.throw('This ship already moored.');
    });

    it('can moor ship', () => {
      const dock = new Dock(new Position(0, 0));
      const argo = new Ship('Argo', 'Sailboat', new Position(0, 0));

      expect(dock.moor(argo)).to.equal(true);
      expect(argo.isAnchorDroped()).to.equal(true);
    });
  });

  describe('#unmoor', () => {
    it('trow error when no Ship object given', () => {
      const dock = new Dock(new Position(10, 10));

      expect(() => dock.unmoor({})).to.throw('Wrong input. Ship object required.');
    });

    it('trow error when Ship not moored', () => {
      const dock = new Dock(new Position(0, 0));
      const argo = new Ship('Argo', 'Sailboat', new Position(0, 0));

      expect(() => dock.unmoor(argo)).to.throw('This ship is not moored yet.');
    });

    it('can unmoor ship', () => {
      const dock = new Dock(new Position(0, 0));
      const argo = new Ship('Argo', 'Sailboat', new Position(0, 0));
      dock.moor(argo);

      expect(dock.unmoor(argo)).to.equal(true);
      expect(argo.isAnchorDroped()).to.equal(false);
    });
  });

  describe('#ships', () => {
    it('return array of moored Ships', () => {
      const dock = new Dock(new Position(0, 0));
      const argo = new Ship('Argo', 'Sailboat', new Position(0, 0));
      dock.moor(argo);

      expect(dock.ships() instanceof Array).to.equal(true);
      expect(dock.ships().length).to.equal(1);
      expect(dock.ships()[0]).to.equal(argo);
    });

    it('return empty array when no moored Ships', () => {
      const dock = new Dock(new Position(0, 0));

      expect(dock.ships() instanceof Array).to.equal(true);
      expect(dock.ships().length).to.equal(0);
      expect(dock.ships()).to.deep.equal([]);
    });
  });
});
