describe('eRegistration', function() {
  describe('Success way', function() {
    const ticket = 'BH118-B50';
    const fullName = 'Ivanov I. I.';
    const nowTime = makeTime(13, 0);

    it('returns true', function() {
      const expectedResult = true;
      assert.deepEqual(eRegistration(ticket, fullName, nowTime), expectedResult);
    });

    it('sets registrationTime', function() {
      const expectedResult = nowTime;
      eRegistration(ticket, fullName, nowTime);
      assert.deepEqual(flights.BH118.tickets[0].registrationTime, expectedResult);
    });
  });

  describe('Error way', function() {
    it('returns error when flight not exists', function() {
      const fullName = 'Ivanov I. I.';
      const nowTime = makeTime(13, 0);
      const ticket = 'BH111-A11';
      const expectedResult = new Error('Flight not found.');
      assert.deepEqual(eRegistration(ticket, fullName, nowTime), expectedResult);
    });

    it('returns error when ticket not exists', function() {
      const fullName = 'Ivanov I. I.';
      const nowTime = makeTime(13, 0);
      const ticket = 'BH118-A111';
      const expectedResult = new Error('Ticket not found.');
      assert.deepEqual(eRegistration(ticket, fullName, nowTime), expectedResult);
    });

    it('returns error when wrong passanger name', function() {
      const ticket = 'BH118-B50';
      const nowTime = makeTime(13, 0);
      const fullName = 'Vasya';
      const expectedResult = new Error('Wrong passanger name.');
      assert.deepEqual(eRegistration(ticket, fullName, nowTime), expectedResult);
    });

    it('returns error when too early to register', function() {
      const ticket = 'BH118-B50';
      const fullName = 'Ivanov I. I.';
      const nowTime = makeTime(9, 59);
      const expectedResult = new Error('Too early to register.');
      assert.deepEqual(eRegistration(ticket, fullName, nowTime), expectedResult);
    });

    it('returns error when too late to register', function() {
      const ticket = 'BH118-B50';
      const fullName = 'Ivanov I. I.';
      const nowTime = makeTime(14, 1);
      const expectedResult = new Error('Too late to register.');
      assert.deepEqual(eRegistration(ticket, fullName, nowTime), expectedResult);
    });

    it('returns error when already registered', function() {
      const ticket = 'BH118-B50';
      const fullName = 'Ivanov I. I.';
      const nowTime = makeTime(13, 0);
      const regTime = makeTime(12, 1);
      flights.BH118.tickets[0].registrationTime = regTime;
      const expectedResult = new Error('You already registered.');
      assert.deepEqual(eRegistration(ticket, fullName, nowTime), expectedResult);
    });

    it('returns error when timestamp not valid', function() {
      const ticket = 'BH118-B50';
      const fullName = 'Ivanov I. I.';
      // const nowTime = makeTime(14, 1);
      const nowTime = 11111111111111111111111111111111111;
      const expectedResult = new Error('timestamp not valid.');
      assert.deepEqual(eRegistration(ticket, fullName, nowTime), expectedResult);
    });
  });
});

