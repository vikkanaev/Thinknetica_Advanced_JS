'use strict';

/**
 * Позиция в двумерном пространстве
 * @param {number} x - позиция по X
 * @param {number} y - позиция по Y
 */
function Position(x, y) {
  this.x = x;
  this.y = y;
  this.to_a = () => [this.x, this.y];

  this.distanceTo = (newPosition) => {
    const [x1, y1] = this.to_a();
    const [x2, y2] = newPosition.to_a();
    const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    return distance;
  };

  this.eq = (otherPosition) => ((this.x === otherPosition.x) && (this.y === otherPosition.y));
}

module.exports = {Position};
