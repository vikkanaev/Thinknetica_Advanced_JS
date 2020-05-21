const file = require('../../../Lesson_3/Task_2/script.js');
const assert = require('assert');

describe('arrayAnalizer', () => {
  it('Normal String', () => {
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

  it('String with new line symbol', () => {
    const input = 'ipsum\n dolor';
    const expectedResult = [
      {word: 'ipsum\n', sum: 568},
      {word: 'dolor', sum: 544},
    ];
    assert.deepEqual(file.textAnalizer(input), expectedResult);
  });

  it('Array instead of String on input', () => {
    const input = ['some text'];
    const expectedResult = new Error('String is required.');
    assert.deepEqual(file.textAnalizer(input), expectedResult);
  });

  it('Number instead of String on input', () => {
    const input = 42;
    const expectedResult = new Error('String is required.');
    assert.deepEqual(file.textAnalizer(input), expectedResult);
  });

  it('NaN instead of String on input', () => {
    const input = NaN;
    const expectedResult = new Error('String is required.');
    assert.deepEqual(file.textAnalizer(input), expectedResult);
  });

  it('Empty String on input', () => {
    const input = '';
    const expectedResult = [{word: '', sum: 0}];
    assert.deepEqual(file.textAnalizer(input), expectedResult);
  });
});

