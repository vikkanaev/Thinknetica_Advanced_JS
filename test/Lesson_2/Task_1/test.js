const file = require('../../../Lesson_2/Task_1/script.js');
const assert = require('assert');

describe('arrayAnalizer', function() {
  it('Normal array with numbers only', function() {
    const input = [91, 93, 45, -67, -96, -40, 34, -96, 42, -58];
    const expectedResult = {count: 5, sum: -357};
    assert.deepEqual(file.arrayAnalizer(input), expectedResult);
  });

  it('Normal array without negative numbers', function() {
    const input = [91, 93, 45];
    const expectedResult = {count: 0, sum: 0};
    assert.deepEqual(file.arrayAnalizer(input), expectedResult);
  });

  it('Not Array on input', function() {
    const input = 'some text';
    const expectedResult = new Error('Array is required.');
    assert.deepEqual(file.arrayAnalizer(input), expectedResult);
  });

  it('Not a number in Array', function() {
    const input = [91, 93, 'some text'];
    const expectedResult = new Error('All elements must be a number.');
    assert.deepEqual(file.arrayAnalizer(input), expectedResult);
  });
});

