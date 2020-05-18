/**
 * Функция генерации отчета по рейсу
 *
 *  * проверка рейса
 *  * подсчет
 *
 * @param {string} flight номер рейса
 * @param {number} nowTime текущее время
 * @return {Report} отчет
 */
function flightReport(flight, nowTime) {
  const timestampValid = validateTimestamp(nowTime);
  if (!timestampValid) return new Error('timestamp not valid');

  flight = findFlightByCode(flight);
  if (typeof (flight) === 'undefined') return new Error('Flight not found.');

  const eRegistartionEnds = timestampDecrease(flight.registartionEnds, 1);
  const eRegistartionStarts = timestampDecrease(flight.registartionEnds, 5);
  let registration;
  (nowTime < eRegistartionStarts || nowTime > eRegistartionEnds) ? registration = false : registration = true;

  let complete = false;
  if (nowTime > flight.registartionEnds) complete = true;

  const countOfSeats = flight.seats;
  const reservedSeats = flight.tickets.length;
  const registeredSeats = flight.tickets.filter((t) => t.registrationTime !== null).length;

  const report = {
    flight: flight.name,
    registration,
    complete,
    countOfSeats,
    reservedSeats,
    registeredSeats,
  };
  return {...report};
}
