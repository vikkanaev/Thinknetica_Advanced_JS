/**
 * базовый класс HtmlElement в котором будут содержаться все общие методы для элементов
 */
class HtmlElement {
  /**
   * Конструктор
   */
  constructor() {
    this._variables = {};
    this._styleVariables = {};
    this._replacePattern = /\{\{(\w+)\}\}/;
    this._isRendered = false;
  }

  /**
   * задает шаблон в виде строки, механизм замены можно использовать любой,
   * но очень желательно не использовать дата атрибуты
   * @param {string} value - имя корабля
   */
  set template(value) {
    this._template = value;
    if (this._isRendered) this._render();
  }

  /**
   * задает список переменных которые должны быть подставлены в шаблон,
   * если в свойстве передана строка - подставить ее, если функция - вызвать ее и подставить ее результат
   * @param {object} params - список переменных
   */
  set variables(params) {
    for (const [key, value] of Object.entries(params)) {
      if (value instanceof Function) {
        this._variables[key] = value();
      } else {
        this._variables[key] = value;
      }
    }
    if (this._isRendered) this._render();
  }

  /**
   * Если передаем DOM элемент то записываем его в свойство _target, если нет - выводим сообщение об ошибке
   * @param {HTMLElement} element - DOM элемент
   */
  set target(element) {
    if (!(element instanceof HTMLElement)) throw new Error('HTMLElement required');
    this._target = element;
  }

  /**
   * позволяет передать стили в виде объекта и присвоить их в атрибут style
   * @param {object} params - список переменных
   */
  set styles(params) {
    this._styleVariables = {};
    for (const [key, value] of Object.entries(params)) {
      this._styleVariables[key] = value;
    }
    if (this._isRendered) this._render();
  }

  /**
   * Метод для отрисовки объекта
   */
  _render() {
    if (this._isRendered) {
      const pattern = this._replacePattern;
      let out = this._template;
      while (pattern.test(out)) {
        out = out.replace(pattern, this._replaceFunction.bind(this));
      }
      this._target.innerHTML = out;
      this._target.firstElementChild.style.cssText = this._prepareSccStyle();
    } else {
      this._target.innerHTML = '';
    }
  }

  /**
   * Функция заменяющая переменные в шаблоне
   * @param {String} _s не используется
   * @param {String} p1 совпавший шаблон
   * @param {Number} _o не используется
   * @param {String} _s2 не используется
   * @return {String} строка с заменой из переменной
   */
  _replaceFunction(_s, p1, _o, _s2) {
    return this._variables[p1];
  }

  /**
   * Подготовка CSS стилей
   * @return {String} строка CSS стилей
   */
  _prepareSccStyle() {
    const out =[];
    for (const [key, value] of Object.entries(this._styleVariables)) {
      out.push(`${key}: ${value}`);
    }
    return out.join('; ');
  }

  /**
   * вызывает _render
   */
  render() {
    this._isRendered = true;
    this._render();
  }

  /**
   * вызывает _render
   */
  unrender() {
    this._isRendered = false;
    this._render();
  }
}

// module.exports = {HtmlElement};


