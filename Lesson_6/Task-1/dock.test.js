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
    let dock;
    beforeEach(() => dock = new Dock(new Position(0, 0)));

    describe('when ship in dock', () => {
      let argo;
      beforeEach(() => argo = new Ship('Argo', 'Sailboat', new Position(0, 0)));

      it('can moor ship', () => {
        expect(dock.moor(argo)).to.equal(true);
        expect(argo.isAnchorDroped()).to.equal(true);
      });
    });

    describe('when ship already moored', () => {
      const argo = new Ship('Argo', 'Sailboat', new Position(0, 0));
      beforeEach(() => dock.moor(argo));

      it('trow error when Ship already moored', () => {
        expect(() => dock.moor(argo)).to.throw('This ship already moored.');
      });
    });

    describe('when ship not in dock', () => {
      const argo = new Ship('Argo', 'Sailboat', new Position(10, 0));

      it('trow error when no Ship object given', () => {
        expect(() => dock.moor({})).to.throw('Wrong input. Ship object required.');
      });

      it('trow error when Ship not in Dock', () => {
        expect(() => dock.moor(argo)).to.throw('You can`t moor ship when ship not in dock');
      });
    });
  });

  describe('#unmoor', () => {
    describe('when ship not moored', () => {
      const dock = new Dock(new Position(0, 0));
      const argo = new Ship('Argo', 'Sailboat', new Position(0, 0));

      it('trow error when no Ship object given', () => {
        expect(() => dock.unmoor({})).to.throw('Wrong input. Ship object required.');
      });

      it('trow error when Ship not moored', () => {
        expect(() => dock.unmoor(argo)).to.throw('This ship is not moored yet.');
      });
    });

    describe('when ship moored', () => {
      const dock = new Dock(new Position(0, 0));
      const argo = new Ship('Argo', 'Sailboat', new Position(0, 0));
      before(() => dock.moor(argo));

      it('can unmoor ship', () => {
        expect(dock.unmoor(argo)).to.equal(true);
        expect(argo.isAnchorDroped()).to.equal(false);
      });
    });
  });

  describe('#ships', () => {
    describe('when ship moored', () => {
      const dock = new Dock(new Position(0, 0));
      const argo = new Ship('Argo', 'Sailboat', new Position(0, 0));
      before(() => dock.moor(argo));

      it('return array of moored Ships', () => {
        expect(dock.ships() instanceof Array).to.equal(true);
        expect(dock.ships().length).to.equal(1);
        expect(dock.ships()[0]).to.equal(argo);
      });
    });

    describe('when ship not moored', () => {
      const dock = new Dock(new Position(0, 0));

      it('return empty array when no moored Ships', () => {
        expect(dock.ships() instanceof Array).to.equal(true);
        expect(dock.ships().length).to.equal(0);
        expect(dock.ships()).to.deep.equal([]);
      });
    });
  });
});
