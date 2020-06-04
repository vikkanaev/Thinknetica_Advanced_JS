const FULL_NAME_ERR = 'fullnameErr';
const FLIGHT_NAME_ERR = 'flightNameErr';
const FULL_NAME_REGEXP = /^([a-zA-Z ])*$/;
let CURRENT_WORLD = bigWorld;

const form = document.getElementById('buy-ticket-form');
const flightNameInput = form.elements.flightName;
const fullnameInput = form.elements.fullname;
const errNotify = document.getElementById('errNotify');
const notify = document.getElementById('notify');
const notifyMsg = document.getElementById('notify-msg');
const notifyClsBtn = document.getElementsByClassName('notify-clsbtn')[0];
const buyButton = document.getElementById('buy-ticket-button');

/**
* @typedef { Object } Errors
* ключи    - id HTML-контейнеров для отображения ошибки
* значения - текст ошибки
*/
const errors = {};

form.addEventListener('submit', submitHandler);
flightNameInput.addEventListener('change', validateFlightNameInput);
fullnameInput.addEventListener('input', validateFullnameInput);
notifyClsBtn.addEventListener('click', notifyClsBtnHandler);

/**
 * Добавляет ошибку к отображению.
 * @param {string} elementId id HTML-контейнера
 * @param {string} message текст ошибки
 */
function addErr(elementId, message) {
  errors[elementId] = message;
  renderErrors();
}

/**
 * Убирает ошибку из отображению.
 * @param {string} elementId id HTML-контейнера
 */
function delErr(elementId) {
  delete errors[elementId];
  modifyErrElement(elementId);
  renderErrors();
}

/**
 * Рендерит блок с ошибками если нужно
 */
function renderErrors() {
  if (Object.keys(errors).length) {
    errNotify.classList.add('error');
    buyButton.disabled = true;
    Object.keys(errors).map((elementId) => modifyErrElement(elementId));
  } else {
    errNotify.classList.remove('error');
    buyButton.disabled = false;
  }
}

/**
 * Изменяет свойства HTML-контейнера отображающего ошибку
 * @param {string} elementId id HTML-контейнера
 */
function modifyErrElement(elementId) {
  const el = document.getElementById(elementId);
  el.innerText = errors[elementId];
  errors[elementId] ? el.classList.add('showErrMsg') : el.classList.remove('showErrMsg');
}

/**
 * Валидируем поле "Номер рейса"
 * @param {MouseEvent} event событие
 */
function validateFlightNameInput(event) {
  if (!isFlightExists(event.target.value)) {
    event.target.classList.add('invalid');
    addErr(FLIGHT_NAME_ERR, 'Такого рейса не существует!');
  } else {
    event.target.classList.remove('invalid');
    delErr(FLIGHT_NAME_ERR);
  }
}

/**
 * проверяет существует ли такой рейс
 * @param {string} flightName Номер рейса
 * @return {boolean} да/нет
 */
function isFlightExists(flightName) {
  return CURRENT_WORLD.flights[flightName];
}


/**
 * Валидируем поле "Полное Имя"
 * @param {MouseEvent} event событие
 */
function validateFullnameInput(event) {
  if (!FULL_NAME_REGEXP.test(event.target.value)) {
    event.target.classList.add('invalid');
    addErr(FULL_NAME_ERR, 'Поле full name может содержать только латинские буквы и пробелы!');
  } else {
    event.target.classList.remove('invalid');
    delErr(FULL_NAME_ERR);
  }
}

/**
 * обрабатываем форму покупки билета
 * @param {MouseEvent} event событие
 */
function submitHandler(event) {
  event.preventDefault();

  const formData = {
    flightName: form.elements.flightName.value,
    fullName: form.elements.fullname.value,
  };

  let res;
  try {
    res = buyTicket(CURRENT_WORLD, formData.flightName, makeTime(5, 10), formData.fullName);
  } catch (error) {
    notifyMsg.innerText = error.message;
    notify.classList.add('error');
    return;
  }

  console.log(res.ticket);
  notifyMsg.innerText = ticketInfo(res.ticket);
  notify.classList.add('success');
  form.elements.flightName.value = form.elements.fullname.value = '';
  CURRENT_WORLD = res.world;
}

/**
 * убирает блок нотификации
 */
function notifyClsBtnHandler() {
  notify.classList.remove('error', 'success');
}

/**
 * Формирует информацию о билете
 * @param {Ticket} ticket билет
 * @return {string} информиция о билете
 */
function ticketInfo(ticket) {
  const text = `Вы успешно купили билет на рейс ${ticket.flight}
  Номер билета: ${ticket.id}
  Место: ${ticket.seat}`;
  return text;
}
