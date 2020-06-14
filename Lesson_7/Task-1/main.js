const {Position} = require('./base/position.js');
const {SailerDock} = require('./sailer/sailer-dock.js');
const {MotorDock} = require('./motor/motor-dock.js');

const sailerDock = new SailerDock(new Position(10, 10));
const motorDock = new MotorDock(new Position(20, 20));
const titanic = motorDock.makeNewShip('Titanic', 'Olympic-class ocean liner', 46000, 'steel');
const argo = sailerDock.makeNewShip('Argo', 'Sailboat', 1, 50);


titanic.move('n');
try {
  sailerDock.moor(titanic);
} catch (e) {
  console.log('Ожидаемо получаем ошибку: You can`t moor ship when ship not in dock');
  console.log(`Ошибка: ${e}\n`);
}

try {
  sailerDock.paint(titanic, 'red');
} catch (e) {
  console.log('Ожидаемо получаем ошибку: Dock can`t paint not moored in it ships');
  console.log(`Ошибка: ${e}\n`);
}

argo.moveTo(new Position(10, 10));
titanic.moveTo(new Position(10, 10));
sailerDock.moor(titanic);
sailerDock.moor(argo);

sailerDock.paint(titanic, 'red');
console.log(`Новый цвет Титаника: ${titanic.color}\n`);

try {
  sailerDock.moor(titanic);
} catch (e) {
  console.log('Ожидаемо получаем ошибку: This ship already moored');
  console.log(`Ошибка: ${e}\n`);
}

try {
  titanic.move('n');
} catch (e) {
  console.log('Ожидаемо получаем ошибку: You need to raise anchor');
  console.log(`Ошибка: ${e}\n `);
}

sailerDock.unmoor(titanic);
titanic.moveTo(new Position(20, 20));
motorDock.moor(titanic);
const potemkin = motorDock.exchange(titanic, 'Potemkin', 'Pre-dreadnought battleship', 10600, 'steel');
console.log(potemkin);

sailerDock.unmoor(argo);
argo.moveTo(new Position(20, 20));
motorDock.moor(argo);
try {
  motorDock.exchange(argo, 'Aurora', 'Pallada-class protected cruiser', 11610, 'steel');
} catch (e) {
  console.log('Ожидаемо получаем ошибку: Dock can exchange only MotorShip');
  console.log(`Ошибка: ${e}\n`);
}

potemkin.move('n');
potemkin.move('e');
potemkin.move('s');
potemkin.move('w');
console.log(potemkin);
