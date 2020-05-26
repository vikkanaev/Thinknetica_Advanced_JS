const REPORT_CONTAINER = 'flight-details';
const TABLE_TEMPLATE = 'table-template';
const TICKET_TEMPLATE = 'ticket-template';
const ERR_TEMPLATE = 'err-template';

/**
 * Вывод информации о рейсе
 * @param {string} flightName - название рейса
 */
function flightDetails(flightName) {
  const flight = bigWorld.flights[flightName];
  if (flight === undefined) {
    renderErr(flightName);
    return;
  }

  setTableHead(flightName);
  const tableBody = document.getElementById('tableBody');
  const tableRows = flight.tickets.map((t) => setTableRow(t));
  tableRows.map((r) => tableBody.append(r));
}

/**
 * Создает таблицу из шаблона
 * @param {string} flightName - название рейса
 */
function setTableHead(flightName) {
  const tableTemplate = document.getElementById(TABLE_TEMPLATE);
  const container = document.getElementById(REPORT_CONTAINER);

  const tableCopy = tableTemplate.content.cloneNode(true);
  const tableTitle = tableCopy.querySelector('.tableTitle');
  tableTitle.textContent = `Список пассажиров рейса ${flightName}`;

  container.append(tableCopy);
}

/**
 * Выводит сообщение об ошибке
 * @param {string} flightName - название рейса
 */
function renderErr(flightName) {
  const errTemplate = document.getElementById(ERR_TEMPLATE);
  const container = document.getElementById(REPORT_CONTAINER);

  const errCopy = errTemplate.content.cloneNode(true);
  const divTitle = errCopy.querySelector('.errTitle');
  divTitle.textContent = `Нет информации о рейсе: ${flightName}`;
  container.append(errCopy);
}

/**
 * Возвращает строку таблицы
 * @param {*} ticket - объект билет
 * @return {HTMLElement} - строка таблицы
 */
function setTableRow(ticket) {
  const ticketTemplate = document.getElementById(TICKET_TEMPLATE);
  const ticketCopy = ticketTemplate.content.cloneNode(true);
  const titleName = ticketCopy.querySelector('.titleName');
  const seatNumber = ticketCopy.querySelector('.seatNumber');
  const fullName = ticketCopy.querySelector('.fullName');
  const registration = ticketCopy.querySelector('.registration');

  titleName.textContent = ticket.id;
  seatNumber.textContent = ticket.seat;
  fullName.textContent = ticket.fullName;
  registration.textContent = (ticket.registrationTime !== null) ? 'зарегестрировался' : 'не регестрировался';

  return ticketCopy;
}

