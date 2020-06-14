const {Dock} = require('./dock.js');
const {Ship} = require('./ship.js');
const {Position} = require('./position.js');
const expect = require('chai').expect;

describe('Dock', () => {
  describe('#new', () => {
    describe('when wrong Position object given', () => {
      it('trow error', () => {
        expect(() => new Dock({})).to.throw('Wrong input. Position object required.');
      });
    });

    describe('when no Position object given', () => {
      const titanic = new Ship('Titanic', 'liner');

      it('creates Ship with 0,0 position', () => {
        expect(titanic.position.x).to.equal(0);
        expect(titanic.position.y).to.equal(0);
      });
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

  describe('#mooredShips', () => {
    describe('when ship moored', () => {
      const dock = new Dock(new Position(0, 0));
      const argo = new Ship('Argo', 'Sailboat', new Position(0, 0));
      before(() => dock.moor(argo));

      it('return array of moored Ships', () => {
        expect(dock.mooredShips() instanceof Array).to.equal(true);
        expect(dock.mooredShips().length).to.equal(1);
        expect(dock.mooredShips()[0]).to.equal(argo);
      });
    });

    describe('when ship not moored', () => {
      const dock = new Dock(new Position(0, 0));

      it('return empty array when no moored Ships', () => {
        expect(dock.mooredShips() instanceof Array).to.equal(true);
        expect(dock.mooredShips().length).to.equal(0);
        expect(dock.mooredShips()).to.deep.equal([]);
      });
    });
  });

  describe('#makeNewShip', () => {
    let dock;

    describe('when Argo not exists yet', () => {
      beforeEach(() => {
        dock = new Dock(new Position(10, 20));
        titanic = dock.makeNewShip('Titanic', 'lainer');
      });

      it('makes new ship', () => {
        expect(dock.makeNewShip('Argo', 'Sailboat')).to.be.an.instanceof(Ship);
        expect(dock.producedShipsNames()).to.include( 'Argo');
      });

      it('Set new ship position eq dock position', () => {
        expect(titanic.position.x).to.equal(10);
        expect(titanic.position.y).to.equal(20);
      });
    });

    describe('when Argo exists', () => {
      let dock;

      beforeEach(() => {
        dock = new Dock(new Position(0, 0));
        dock.makeNewShip('Argo', 'Sailboat', new Position(0, 0));
      });

      it('can`t create ship with same name', () => {
        expect(() => dock.makeNewShip('Argo', 'Bo')).to.throw('This ship name already exists.');
        expect(dock.producedShipsNames()).to.not.include(['Argo']);
      });
    });
  });

  describe('#paint', () => {
    let dock;
    beforeEach(() => dock = new Dock(new Position(0, 0)));

    describe('when ship not in dock', () => {
      const argo = new Ship('Argo', 'Sailboat', new Position(10, 10));

      it('trow error', () => {
        expect(() => dock.paint(argo, 'red')).to.throw('Dock can`t paint not moored in it ships');
      });
    });

    describe('when ship in dock but not moored', () => {
      const argo = new Ship('Argo', 'Sailboat', new Position(0, 0));

      it('trow error', () => {
        expect(() => dock.paint(argo, 'red')).to.throw('Dock can`t paint not moored in it ships');
      });
    });

    describe('when ship in dock and moored', () => {
      let argo;
      beforeEach(() => {
        dock = new Dock(new Position(0, 0));
        argo = new Ship('Argo', 'Sailboat', new Position(0, 0));
        dock.moor(argo);
      });

      it('color Argo to red', () => {
        expect(dock.paint(argo, 'red')).to.equal(true);
        expect(argo.color).to.equal('red');
      });
    });
  });

  describe('#repair', () => {
    let dock;
    beforeEach(() => dock = new Dock(new Position(0, 0)));

    describe('when ship not in dock', () => {
      const argo = new Ship('Argo', 'Sailboat', new Position(10, 10));

      it('trow error', () => {
        expect(() => dock.repair(argo)).to.throw('Dock can`t repair not moored in it ships');
      });
    });

    describe('when ship in dock but not moored', () => {
      const argo = new Ship('Argo', 'Sailboat', new Position(0, 0));

      it('trow error', () => {
        expect(() => dock.repair(argo)).to.throw('Dock can`t repair not moored in it ships');
      });
    });

    describe('when ship in dock and moored', () => {
      describe('when try to repair not supported ship class', () => {
        let someDock;
        let argo;
        beforeEach(() => {
          const FooShip = function FooShip() {};
          const FooDock = function FooDock(position) {
            this.SUPPORTED_SHIP_TYPE = FooShip;
            this.position = position;
          };
          FooDock.prototype = new Dock();
          someDock = new FooDock(new Position(0, 0));
          argo = new Ship('Argo', 'Sailboat', new Position(0, 0));
          someDock.moor(argo);
        });

        it('trow error', () => {
          expect(() => someDock.repair(argo)).to.throw('Dock can repair only FooShip');
        });
      });

      describe('when try to repair supported ship class', () => {
        let argo;
        beforeEach(() => {
          dock = new Dock(new Position(0, 0));
          argo = new Ship('Argo', 'Sailboat', new Position(0, 0));
          argo.isBroken = true;
          dock.moor(argo);
        });

        it('repair Argo', () => {
          expect(dock.repair(argo)).to.equal(true);
          expect(argo.isBroken).to.equal(false);
        });
      });
    });
  });

  describe('#exchange', () => {
    let dock;
    beforeEach(() => dock = new Dock(new Position(0, 0)));

    describe('when ship not in dock', () => {
      const argo = new Ship('Argo', 'Sailboat', new Position(10, 10));

      it('trow error', () => {
        expect(() => dock.exchange(argo, 'Aurora', 'Pallada-class protected cruiser', 11610, 'steel'))
            .to.throw('Dock can`t exchange not moored in it ships');
      });
    });

    describe('when ship in dock but not moored', () => {
      const argo = new Ship('Argo', 'Sailboat', new Position(0, 0));

      it('trow error', () => {
        expect(() => dock.exchange(argo, 'Aurora', 'Pallada-class protected cruiser', 11610, 'steel'))
            .to.throw('Dock can`t exchange not moored in it ships');
      });
    });

    describe('when ship in dock and moored', () => {
      describe('when try to exchange not supported ship class', () => {
        let someDock;
        let argo;
        beforeEach(() => {
          const FooShip = function FooShip() { };
          const FooDock = function FooDock(position) {
            this.SUPPORTED_SHIP_TYPE = FooShip;
            this.position = position;
          };
          FooDock.prototype = new Dock();
          someDock = new FooDock(new Position(0, 0));
          argo = new Ship('Argo', 'Sailboat', new Position(0, 0));
          someDock.moor(argo);
        });

        it('trow error', () => {
          expect(() => someDock.exchange(argo)).to.throw('Dock can exchange only FooShip');
        });
      });

      describe('when try to exchange supported ship class', () => {
        let titanic;
        beforeEach(() => {
          dock = new Dock(new Position(0, 0));
          titanic = new Ship('Titanic', 'Olympic-class ocean liner', new Position(0, 0));
          dock.moor(titanic);
        });

        it('exchange Titanic to Aurora', () => {
          expect(dock.exchange(titanic, 'Aurora', 'Pallada-class protected cruiser', new Position(0, 0)))
              .to.be.an.instanceof(Ship);
        });
      });
    });
  });
});
