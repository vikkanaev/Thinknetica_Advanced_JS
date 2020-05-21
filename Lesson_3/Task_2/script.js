/**
 * @typedef {Object} Information
 * @property {string} word - само слово
 * @property {number} sum - сумма кодов всех символов слова
 */

const charCode = (word) => word.split('').map((x) => x.charCodeAt(0)).reduce((a, b) => a + b);

/**
 * Анализатор текста
 * @param {string} str - текст для анализа
 * @return {(Array.<Information>|Error)} - объект Information или сообщение об ошибке
 */
function textAnalizer(str) {
  if (typeof(str) !='string') throw new Error('String is required.');
  if (str === '') return [{word: '', sum: 0}];

  const words = str.split(' ');
  const out = words.map((w) => {
    return {word: w, sum: charCode(w)};
  });
  return out;
};

module.exports = {textAnalizer};
