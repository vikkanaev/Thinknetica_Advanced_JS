'use strict';

const result = addFlight(
    bigWorld,
    {
      name: 'Airbus 747',
      seats: 36,
      businessSeats: 4,
    },
    makeTime(16, 0),
    'BH118',
);

bigWorld = result.world;

const result2 = addFlight(
    bigWorld,
    {
      name: 'Airbus 747',
      seats: 36,
      businessSeats: 4,
    },
    makeTime(1, 0),
    'AWAY42',
);

bigWorld = result2.world;

const result3 = addFlight(
    bigWorld,
    {
      name: 'Airbus 747',
      seats: 0,
      businessSeats: 0,
    },
    makeTime(20, 0),
    'NOSEAT13',
);

bigWorld = result3.world;

// console.log(bigWorld);

const res = buyTicket(bigWorld, 'BH118', makeTime(5, 10), 'Petrov I. I.');

bigWorld = res.world;
// console.log(bigWorld);

const res2 = buyTicket(bigWorld, 'BH118', makeTime(5, 10), 'Ivanov I. I.');

// console.log(bigWorld, res2.world);
bigWorld = res2.world;
console.log(bigWorld);

flightDetails('BH118');
flightDetails('AZAZA');
