/**
 * @typedef {Object} Information
 * @property {number} count - колличество отричательных чисел в массиве
 * @property {number} sum - сумма всех отрицательных чисел в массиве
 */

/**
 * Анализатор масива
 * @param {array} arr - масив чисел для анализа
 * @return {(Information|Error)} - объект Information или сообщение об ошибке
 */
function arrayAnalizer(arr) {
  if (!Array.isArray(arr)) throw new TypeError('Array is required.');
  if (arr.some((x) => typeof (x) != 'number')) throw new Error('All elements must be a number.');

  const negativeElements = arr.filter((x) => x < 0);
  if (negativeElements.length == 0) return {count: 0, sum: 0};

  const count = negativeElements.length;
  const sum = negativeElements.reduce((a, b) => a + b);
  return {count, sum};
};

module.exports = {arrayAnalizer};
