const FLIGHT_CLASS_NAMES = {
  0: 'Стандарт',
  1: 'Бизнес',
};
const FORM_VALIDATION_ERRORS = {
  FULL_NAME_ERROR: 'Поле ФИО может содержать только латинские буквы и пробелы!',
  FLIGHT_NAME_ERROR: 'Такого рейса не существует!',
};
const EVENT_HANDLER_CONFIG = {
  'fullName': {validationRule: isFullNameValid, erroreCode: 'FULL_NAME_ERROR'},
  'flightName': {validationRule: isFlightExists, erroreCode: 'FLIGHT_NAME_ERROR'},
};

/**
 * Валидирует поле формы "ФИО"
 * @param {string} fullName - ФИО
 * @return {boolean} да/нет
 */
function isFullNameValid(fullName) {
  const FULL_NAME_REGEXP = /^([a-zA-Z ])*$/;
  return FULL_NAME_REGEXP.test(fullName);
}

/**
 * Проверяет существует ли такой рейс
 * @param {string} flightName - Номер рейса
 * @return {boolean} - да/нет
 */
function isFlightExists(flightName) {
  return CURRENT_WORLD.flights[flightName];
}

let CURRENT_WORLD = bigWorld;
const form = document.querySelector('.buy-ticket__form');
const flightNameInput = form.elements.flightName;
const fullNameInput = form.elements.fullName;
const notifyContainer = document.querySelector('.buy-ticket__notify');
const buyButton = document.querySelector('.buy-ticket__form-submit-button');

/**
* @typedef { Object } FormValidationErrors
* ключи    - код ошибки
* значения - текст ошибки
*/
const formValidationErrors = {};

form.addEventListener('submit', handleFormSubmit);
flightNameInput.addEventListener('change', validateFormInput);
fullNameInput.addEventListener('input', validateFormInput);

/**
 * Добавляет ошибку к отображению.
 * @param {string} erroreCode - код ошибки
 */
function addFormValidationError(erroreCode) {
  formValidationErrors[erroreCode] = FORM_VALIDATION_ERRORS[erroreCode];
  renderFormValidationErrors();
}

/**
 * Убирает ошибку из отображения.
 * @param {string} erroreCode - код ошибки
 */
function deleteFormValidationError(erroreCode) {
  delete formValidationErrors[erroreCode];
  renderFormValidationErrors();
}

/**
 * Рендерит блок с ошибками валидации формы
 */
function renderFormValidationErrors() {
  clearNotifyContainer();

  if (Object.keys(formValidationErrors).length) {
    title = document.createElement('h2');
    title.innerText = 'Ошибка заполнения формы';
    list = document.createElement('ul');

    notifyContainer.classList.add('buy-ticket__notify_error');
    buyButton.disabled = true;
    notifyContainer.append(title, list);
    items = Object.keys(formValidationErrors).map((errorId) => createErrorItem(errorId));
    list.append(...items);
  } else {
    buyButton.disabled = false;
  }
}

/**
 * Очищает контейнер для нотификаций
 * @param {HTMLelement} node - нода, которую надо очистить
 */
function clearNotifyContainer() {
  while (notifyContainer.lastElementChild) {
    notifyContainer.removeChild(notifyContainer.lastElementChild);
  }
  notifyContainer.className = 'buy-ticket__notify';
}

/**
 * Возвращает html-элемент с текстом ошибок
 * @param {string} errorId - id ошибки
 * @return {HTMLelement} - html-элемент с текстом ошибок
 */
function createErrorItem(errorId) {
  const el = document.createElement('li');
  el.innerText = formValidationErrors[errorId];
  return el;
}

/**
 * Валидирует поля ввода формы заказа билета
 * @param {MouseEvent} event - событие типа клик
 */
function validateFormInput(event) {
  const targetName = event.target.name;
  if (!['fullName', 'flightName'].includes(targetName)) return;

  const config = EVENT_HANDLER_CONFIG[targetName];
  if (!config.validationRule(event.target.value)) {
    event.target.classList.add('buy-ticket__form-input_invalid');
    addFormValidationError(config.erroreCode);
  } else {
    event.target.classList.remove('buy-ticket__form-input_invalid');
    deleteFormValidationError(config.erroreCode);
  }
}

/**
 * обрабатывает форму покупки билета
 * @param {MouseEvent} event - событие
 */
function handleFormSubmit(event) {
  event.preventDefault();

  const formData = {
    flightName: form.elements.flightName.value,
    fullName: form.elements.fullName.value,
    flightClass: parseInt(form.elements.flightClass.value),
  };

  let res;
  const dateNow = new Date();
  const hoursNow = dateNow.getHours();
  const minutesNow = dateNow.getMinutes();

  try {
    res = buyTicket(
        CURRENT_WORLD,
        formData.flightName,
        makeTime(hoursNow, minutesNow),
        formData.fullName,
        formData.flightClass);
  } catch (error) {
    renderFormExecutionResult(error.message, false);
    return;
  }

  console.log(res.ticket);
  renderFormExecutionResult(prepareTicketInfo(res.ticket), true);
  form.elements.flightName.value = form.elements.fullName.value = '';
  CURRENT_WORLD = res.world;
}

/**
 * Рендерит блок с результатами обработки формы
 * @param {string} message - текст для отображения
 * @param {boolean} isSuccess - была ли обработка формы успешной
 */
function renderFormExecutionResult(message, isSuccess) {
  clearNotifyContainer();

  const actualNotifyClass = isSuccess ? 'buy-ticket__notify_success' : 'buy-ticket__notify_error';
  notifyContainer.classList.add(actualNotifyClass);

  closeButton = document.createElement('span');
  closeButton.classList.add('buy-ticket__notify-close-button');
  messageContainer = document.createElement('span');
  messageContainer.innerText = message;
  closeButton.addEventListener('click', clearNotifyContainer);

  notifyContainer.append(messageContainer, closeButton);
}

/**
 * Формирует информацию о билете
 * @param {Ticket} ticket - билет
 * @return {string} - информиция о билете
 */
function prepareTicketInfo(ticket) {
  const text = `Вы успешно купили билет на рейс ${ticket.flight}
  Номер билета: ${ticket.id}
  Место: ${ticket.seat}
  Класс: ${FLIGHT_CLASS_NAMES[ticket.type]}`;
  return text;
}
