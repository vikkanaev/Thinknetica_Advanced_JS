const {ShipFactory} = require('./ship-factory.js');
const {Position} = require('./position.js');
const {Dock} = require('./dock.js');

const factory = new ShipFactory();
const titanic = factory.makeNewShip('Titanic', 'Olympic-class ocean liner', new Position(0, 0));
const argo = factory.makeNewShip('Argo', 'Sailboat', new Position(0, 0));
const dock = new Dock(new Position(10, 10));

argo.moveTo(new Position(10, 10));
titanic.moveTo(new Position(10, 10));
dock.moor(titanic);
dock.moor(argo);

dock.unmoor(titanic);
titanic.move('n');
titanic.move('e');
titanic.move('s');
titanic.move('w');
console.log(titanic);
