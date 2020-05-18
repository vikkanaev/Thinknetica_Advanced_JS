const findFlightByCode = (code) => {
  flightName = code.split('-')[0];
  return flights[flightName];
};

const timestampDecrease = (timestamp, hours) => {
  const date = new Date(timestamp);
  return date.setHours(date.getHours() - hours);
};

const validateTimestamp = (timestamp) => (new Date(timestamp)).getTime() > 0;
