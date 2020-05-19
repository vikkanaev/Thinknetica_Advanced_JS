describe('flightReport', function() {
  flights.BH118.tickets = [
    {
      id: 'BH118-B50',
      flight: 'BH118',
      fullName: 'Ivanov I. I.',
      type: 0,
      seat: 18,
      buyTime: makeTime(2, 0),
      registrationTime: null,
    },
  ];

  describe('Success way', function() {
    const flight = 'BH118-B50';
    const nowTime = makeTime(13, 0);

    it('returns "registration: true" then registration awailable', function() {
      const expectedResult = {
        flight: 'BH118',
        registration: true,
        complete: false,
        countOfSeats: 28,
        reservedSeats: 1,
        registeredSeats: 1,
      };
      assert.deepEqual(flightReport(flight, nowTime), expectedResult);
    });

    it('returns "registration: false" then registration closed', function() {
      const nowTime = makeTime(14, 30);
      const expectedResult = {
        flight: 'BH118',
        registration: false,
        complete: false,
        countOfSeats: 28,
        reservedSeats: 1,
        registeredSeats: 1,
      };
      assert.deepEqual(flightReport(flight, nowTime), expectedResult);
    });

    it('returns "registration: false" then registration not start yet.', function() {
      const nowTime = makeTime(9, 0);
      const expectedResult = {
        flight: 'BH118',
        registration: false,
        complete: false,
        countOfSeats: 28,
        reservedSeats: 1,
        registeredSeats: 1,
      };
      assert.deepEqual(flightReport(flight, nowTime), expectedResult);
    });

    it('returns "complete: true" then flew away.', function() {
      const nowTime = makeTime(15, 1);
      const expectedResult = {
        flight: 'BH118',
        registration: false,
        complete: true,
        countOfSeats: 28,
        reservedSeats: 1,
        registeredSeats: 1,
      };
      assert.deepEqual(flightReport(flight, nowTime), expectedResult);
    });

    it('returns countOfSeats from flight.seats', function() {
      const nowTime = makeTime(15, 1);
      flights.BH118.seats = 99;
      const expectedResult = {
        flight: 'BH118',
        registration: false,
        complete: true,
        countOfSeats: 99,
        reservedSeats: 1,
        registeredSeats: 1,
      };
      assert.deepEqual(flightReport(flight, nowTime), expectedResult);
    });

    it('returns reservedSeats by counting all tickets', function() {
      const nowTime = makeTime(15, 1);
      const expectedResult = {
        flight: 'BH118',
        registration: false,
        complete: true,
        countOfSeats: 99,
        reservedSeats: 1,
        registeredSeats: 1,
      };
      assert.deepEqual(flightReport(flight, nowTime), expectedResult);
    });

    it('returns registeredSeats by counting registered passangers', function() {
      const nowTime = makeTime(15, 1);
      flights.BH118.seats = 28;
      flights.BH118.tickets[0].registrationTime = null;
      const expectedResult = {
        flight: 'BH118',
        registration: false,
        complete: true,
        countOfSeats: 28,
        reservedSeats: 1,
        registeredSeats: 0,
      };
      assert.deepEqual(flightReport(flight, nowTime), expectedResult);
    });
  });

  describe('Error way', function() {
    it('returns error when flight not exists', function() {
      const flight = 'BH111-A11';
      const nowTime = makeTime(13, 0);
      const expectedResult = new Error('Flight not found.');
      assert.deepEqual(flightReport(flight, nowTime), expectedResult);
    });

    it('returns error when timestamp not valid', function() {
      const flight = 'BH118-B50';
      const nowTime = 11111111111111111111111111111111111;
      const expectedResult = new Error('timestamp not valid.');
      assert.deepEqual(flightReport(flight, nowTime), expectedResult);
    });
  });
});

