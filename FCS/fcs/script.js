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