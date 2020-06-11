
/**
 * Класс Студент
 * @param {String} fullName - ФИО на русском языке
 */
function Student(fullName) {
  const fio = parseFullNameString(fullName);
  this.surname = fio.surname,
  this.name = fio.name,
  this.patronymic = fio.patronymic,
  this.fullName = () => `${this.name} ${this.patronymic} ${this.surname}`;
  this.shortName = () => `${this.surname} ${this.name[0]}. ${this.patronymic[0]}.`;
  this.isSick = false;
}

/**
 * @typedef {Object} Fio
 * @property {string} name - имя
 * @property {string} patronymic - отчество
 * @property {string} surname - фамилия
 */

/**
 * Разбирает строку ФИО в элементы Фамилия, Имя, Отчество
 * @param {String} fullName - ФИО на русском языке
 * @return {Fio} - объект с ФИО разбитыми по полям
 */
function parseFullNameString(fullName) {
  // TODO: Переписать на промисы, когда мы их пройдем
  const request = require('sync-request');
  const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fio';
  const KEY = '4a284b02ba0fd8b054ba41c229b24188c83c2dc3';

  const res = request('POST', url, {headers: {'Authorization': `Token ${KEY}`}, json: {'query': fullName}});
  const body = JSON.parse(res.getBody('UTF8'));

  if (!(body.suggestions[0] && body.suggestions[0]['data'])) throw new Error('No valid data from API');
  const data = body.suggestions[0]['data'];

  if (!(data.surname && data.name && data.patronymic)) throw new Error('Full name is not full');
  const fio = {
    surname: data.surname,
    name: data.name,
    patronymic: data.patronymic,
  };
  return fio;
}

module.exports = {Student};
