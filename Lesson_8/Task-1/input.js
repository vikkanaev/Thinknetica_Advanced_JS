/**
 * класс для кастомного Input
 */
class Input extends HtmlElement {
  set onInput(func) {
    this._target.firstElementChild.addEventListener('input', func);
  }

  set onFocus(func) {
    this._target.firstElementChild.addEventListener('focus', func);
  }
}
