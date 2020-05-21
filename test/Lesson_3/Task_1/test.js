const file = require('../../../Lesson_3/Task_1/script.js');
const assert = require('assert');

describe('arrayAnalizer', () => {
  it('Normal array with numbers only', () => {
    const input = [91, 93, 45, -67, -96, -40, 34, -96, 42, -58];
    const expectedResult = {count: 5, sum: -357};
    assert.deepEqual(file.arrayAnalizer(input), expectedResult);
  });

  it('Normal array without negative numbers', () => {
    const input = [91, 93, 45];
    const expectedResult = {count: 0, sum: 0};
    assert.deepEqual(file.arrayAnalizer(input), expectedResult);
  });

  it('Array with -0 number', () => {
    const input = [91, 93, 45, -0];
    const expectedResult = {count: 0, sum: 0};
    assert.deepEqual(file.arrayAnalizer(input), expectedResult);
  });

  it('Array with -0 number and another negative number ', () => {
    const input = [91, 93, -1, 45, -0];
    const expectedResult = {count: 1, sum: -1};
    assert.deepEqual(file.arrayAnalizer(input), expectedResult);
  });

  it('text instead of array on input', () => {
    const input = 'some text';
    const expectedResult = new Error('Array is required.');
    assert.deepEqual(file.arrayAnalizer(input), expectedResult);
  });

  it('number insted of array on input', () => {
    const input = 42;
    const expectedResult = new Error('Array is required.');
    assert.deepEqual(file.arrayAnalizer(input), expectedResult);
  });

  it('Not a number in Array', () => {
    const input = [91, 93, 'some text'];
    const expectedResult = new Error('All elements must be a number.');
    assert.deepEqual(file.arrayAnalizer(input), expectedResult);
  });
});

