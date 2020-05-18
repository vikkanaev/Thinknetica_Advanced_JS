const findFlightByTicket = (ticket) => {
  flightName = ticket.split('-')[0];
  return flights[flightName];
};

const timestampDecrease = (timestamp, hours) => {
  const date = new Date(timestamp);
  return date.setHours(date.getHours() - hours);
};

/**
 * Функция пробует произвести электронную регистрацию пассажира
 *
 *  * проверка билета
 *  * проверка данных пассажира
 *  * электронную регистрацию можно произвести только в период от 5 до 1 часа до полета
 *
 * @param {string} ticket номер билета
 * @param {string} fullName имя пассажира
 * @param {number} nowTime текущее время
 * @return {boolean} успешна ли регистрация
 */
function eRegistration(ticket, fullName, nowTime) {
  flight = findFlightByTicket(ticket);
  if (typeof(flight) === 'undefined') return new Error('Flight not found.');

  ticketObject = flight.tickets.filter((t) => t.id === ticket)[0];
  if (typeof (ticketObject) === 'undefined') return new Error('Ticket not found.');

  if (ticketObject.fullName !== fullName) return new Error('Wrong passanger name.');

  const eRegistartionEnds = timestampDecrease(flight.registartionEnds, 1);
  const eRegistartionStarts = timestampDecrease(flight.registartionEnds, 5);
  if (nowTime < eRegistartionStarts) return new Error('Too early to register.');
  if (nowTime > eRegistartionEnds) return new Error('Too late to register.');

  if (ticketObject.registrationTime !== null) return Error('You already registered.');

  ticketObject.registrationTime = nowTime;
  return true;
}
