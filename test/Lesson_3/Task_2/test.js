const textAnalizer = require('../../../Lesson_3/Task_2/script.js').textAnalizer;
const expect = require('chai').expect;
const runTest = (input, expectedResult) => expect(textAnalizer(input)).to.deep.equal(expectedResult);

describe('textAnalizer', () => {
  it('Normal String', () => {
    const input = 'Lorem ipsum dolor sit amet.';
    const expectedResult = [
      {word: 'Lorem', sum: 511},
      {word: 'ipsum', sum: 558},
      {word: 'dolor', sum: 544},
      {word: 'sit', sum: 336},
      {word: 'amet.', sum: 469},
    ];
    runTest(input, expectedResult);
  });

  it('String with new line symbol', () => {
    const input = 'ipsum\n dolor';
    const expectedResult = [
      {word: 'ipsum\n', sum: 568},
      {word: 'dolor', sum: 544},
    ];
    runTest(input, expectedResult);
  });

  it('Array instead of String on input', () => {
    const input = ['some text'];
    const expectedResult = 'String is required.';
    const badFn = () => textAnalizer(input);
    expect(badFn).to.throw(expectedResult);
  });

  it('Number instead of String on input', () => {
    const input = 42;
    const expectedResult = 'String is required.';
    const badFn = () => textAnalizer(input);
    expect(badFn).to.throw(expectedResult);
  });

  it('NaN instead of String on input', () => {
    const input = NaN;
    const expectedResult = 'String is required.';
    const badFn = () => textAnalizer(input);
    expect(badFn).to.throw(expectedResult);
  });

  it('Empty String on input', () => {
    const input = '';
    const expectedResult = [{word: '', sum: 0}];
    runTest(input, expectedResult);
  });
});

