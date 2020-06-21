/**
 * класс для кастомного Div
 */
class Div extends HtmlElement {
  set onClick(func) {
    this._target.firstElementChild.addEventListener('click', func);
  }
}
