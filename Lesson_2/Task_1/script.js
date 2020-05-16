/**
 * My funy function
 * @param {array} arr valiable
 * @return {string} The sum of the two numbers.
 */
function arrayAnalizer(arr) {
  if (!Array.isArray(arr)) return new Error('Array is required.');
  if (arr.some((x) => typeof(x) !='number')) return new Error('All elements must be a number.');

  const negativeElements = arr.filter((x) => x < 0);
  const count = negativeElements.length;
  const sum = negativeElements.reduce((a, b) => a + b);
  return {count, sum};
};

module.exports = {arrayAnalizer};
