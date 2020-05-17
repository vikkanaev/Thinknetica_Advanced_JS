const file = require('../../../Lesson_2/Task_2/script.js');
const assert = require('assert');

describe('arrayAnalizer', function() {
  it('Normal String', function() {
    const input = 'Lorem ipsum dolor sit amet.';
    const expectedResult = [
      {word: 'Lorem', sum: 511},
      {word: 'ipsum', sum: 558},
      {word: 'dolor', sum: 544},
      {word: 'sit', sum: 336},
      {word: 'amet.', sum: 469},
    ];
    assert.deepEqual(file.textAnalizer(input), expectedResult);
  });

  it('String with new line symbol', function() {
    const input = 'ipsum\n dolor';
    const expectedResult = [
      {word: 'ipsum\n', sum: 568},
      {word: 'dolor', sum: 544},
    ];
    assert.deepEqual(file.textAnalizer(input), expectedResult);
  });

  it('Not String on input', function() {
    const input = ['some text'];
    const expectedResult = new Error('String is required.');
    assert.deepEqual(file.textAnalizer(input), expectedResult);
  });

  it('Empty String on input', function() {
    const input = '';
    const expectedResult = [{word: '', sum: 0}];
    assert.deepEqual(file.textAnalizer(input), expectedResult);
  });
});

