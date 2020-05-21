const textAnalizer = require('../../../Lesson_3/Task_2/script.js').textAnalizer;
const expect = require('chai').expect;
const testThatInputCreatesExpectedResult = (input, expectedResult) => {
  expect(textAnalizer(input)).to.deep.equal(expectedResult);
};
const testThatInputThrowsError = (input, expectedResult) => expect(() => textAnalizer(input)).to.throw(expectedResult);

describe('textAnalizer', () => {
  it('Returns Information object for normal string', () => {
    const input = 'Lorem ipsum dolor sit amet.';
    const expectedResult = [
      {word: 'Lorem', sum: 511},
      {word: 'ipsum', sum: 558},
      {word: 'dolor', sum: 544},
      {word: 'sit', sum: 336},
      {word: 'amet.', sum: 469},
    ];
    testThatInputCreatesExpectedResult(input, expectedResult);
  });

  it('Returns Information object for string with new line symbol', () => {
    const input = 'ipsum\n dolor';
    const expectedResult = [
      {word: 'ipsum\n', sum: 568},
      {word: 'dolor', sum: 544},
    ];
    testThatInputCreatesExpectedResult(input, expectedResult);
  });

  it('Throws error for Array', () => {
    const input = ['some text'];
    const expectedResult = 'String is required.';
    testThatInputThrowsError(input, expectedResult);
  });

  it('Throws error for Number', () => {
    const input = 42;
    const expectedResult = 'String is required.';
    testThatInputThrowsError(input, expectedResult);
  });

  it('Throws error for NaN', () => {
    const input = NaN;
    const expectedResult = 'String is required.';
    testThatInputThrowsError(input, expectedResult);
  });

  it('Returns empty Information object for empty string', () => {
    const input = '';
    const expectedResult = [{word: '', sum: 0}];
    testThatInputCreatesExpectedResult(input, expectedResult);
  });
});

