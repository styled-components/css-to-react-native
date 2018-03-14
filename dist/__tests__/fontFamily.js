'use strict';

var _ = require('..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('transforms font-family with double quotes', function () {
  expect((0, _2.default)([['font-family', '"Helvetica Neue"']])).toEqual({
    fontFamily: 'Helvetica Neue'
  });
});

it('transforms font-family with single quotes', function () {
  expect((0, _2.default)([['font-family', "'Helvetica Neue'"]])).toEqual({
    fontFamily: 'Helvetica Neue'
  });
});

it('transforms font-family without quotes', function () {
  expect((0, _2.default)([['font-family', 'Helvetica Neue']])).toEqual({
    fontFamily: 'Helvetica Neue'
  });
});

it('transforms font-family with quotes with otherwise invalid values', function () {
  expect((0, _2.default)([['font-family', '"Goudy Bookletter 1911"']])).toEqual({
    fontFamily: 'Goudy Bookletter 1911'
  });
});

it('transforms font-family with quotes with escaped values', function () {
  expect((0, _2.default)([['font-family', '"test\\A test"']])).toEqual({
    fontFamily: 'test\ntest'
  });
});

it('transforms font-family with quotes with escaped quote', function () {
  expect((0, _2.default)([['font-family', '"test\\"test"']])).toEqual({
    fontFamily: 'test"test'
  });
});

it('does not transform invalid unquoted font-family', function () {
  expect(function () {
    return (0, _2.default)([['font-family', 'Goudy Bookletter 1911']]);
  }).toThrow();
});