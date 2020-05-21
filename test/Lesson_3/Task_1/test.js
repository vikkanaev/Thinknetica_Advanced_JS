const arrayAnalizer = require('../../../Lesson_3/Task_1/script.js').arrayAnalizer;
const expect = require('chai').expect;
const testThatInputCreatesExpectedResult = (input, expectedResult) => {
  expect(arrayAnalizer(input)).to.deep.equal(expectedResult);
};
const testThatInputThrowsError = (input, expectedResult) => expect(() => arrayAnalizer(input)).to.throw(expectedResult);

describe('arrayAnalizer', () => {
  it('Returns Information object for array of numbers', () => {
    const input = [91, 93, 45, -67, -96, -40, 34, -96, 42, -58];
    const expectedResult = {count: 5, sum: -357};
    testThatInputCreatesExpectedResult(input, expectedResult);
  });

  it('Returns empty Information object for array without negative numbers', () => {
    const input = [91, 93, 45];
    const expectedResult = {count: 0, sum: 0};
    testThatInputCreatesExpectedResult(input, expectedResult);
  });

  it('Returns empty Information object for array with -0 number', () => {
    const input = [91, 93, 45, -0];
    const expectedResult = {count: 0, sum: 0};
    testThatInputCreatesExpectedResult(input, expectedResult);
  });

  it('Returns Information object for array with -0 number and another negative number ', () => {
    const input = [91, 93, -1, 45, -0];
    const expectedResult = {count: 1, sum: -1};
    testThatInputCreatesExpectedResult(input, expectedResult);
  });

  it('Throws error for text', () => {
    const input = 'some text';
    const expectedResult = 'Array is required.';
    testThatInputThrowsError(input, expectedResult);
  });

  it('Throws error for number', () => {
    const input = 42;
    const expectedResult = 'Array is required.';
    testThatInputThrowsError(input, expectedResult);
  });

  it('Throws error for not number array', () => {
    const input = [91, 93, 'some text'];
    const expectedResult = 'All elements must be a number.';
    testThatInputThrowsError(input, expectedResult);
  });

  it('Returns empty Information object for empty array', () => {
    const input = [];
    const expectedResult = {count: 0, sum: 0};
    testThatInputCreatesExpectedResult(input, expectedResult);
  });
});

