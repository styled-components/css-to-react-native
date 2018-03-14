'use strict';

var _ = require('..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('transforms font', function () {
  expect((0, _2.default)([['font', 'bold italic small-caps 16px/18px "Helvetica"']])).toEqual({
    fontFamily: 'Helvetica',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontVariant: ['small-caps'],
    lineHeight: 18
  });
});

it('transforms font missing font-variant', function () {
  expect((0, _2.default)([['font', 'bold italic 16px/18px "Helvetica"']])).toEqual({
    fontFamily: 'Helvetica',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontVariant: [],
    lineHeight: 18
  });
});

it('transforms font missing font-style', function () {
  expect((0, _2.default)([['font', 'bold small-caps 16px/18px "Helvetica"']])).toEqual({
    fontFamily: 'Helvetica',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontVariant: ['small-caps'],
    lineHeight: 18
  });
});

it('transforms font missing font-weight', function () {
  expect((0, _2.default)([['font', 'italic small-caps 16px/18px "Helvetica"']])).toEqual({
    fontFamily: 'Helvetica',
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'italic',
    fontVariant: ['small-caps'],
    lineHeight: 18
  });
});

it('transforms font with font-weight normal', function () {
  expect((0, _2.default)([['font', 'normal 16px/18px "Helvetica"']])).toEqual({
    fontFamily: 'Helvetica',
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontVariant: [],
    lineHeight: 18
  });
});

it('transforms font with font-weight and font-style normal', function () {
  expect((0, _2.default)([['font', 'normal normal 16px/18px "Helvetica"']])).toEqual({
    fontFamily: 'Helvetica',
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontVariant: [],
    lineHeight: 18
  });
});

it('transforms font with no font-weight, font-style, and font-variant', function () {
  expect((0, _2.default)([['font', '16px/18px "Helvetica"']])).toEqual({
    fontFamily: 'Helvetica',
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontVariant: [],
    lineHeight: 18
  });
});

it('omits line height if not specified', function () {
  expect((0, _2.default)([['font', '16px "Helvetica"']])).toEqual({
    fontFamily: 'Helvetica',
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontVariant: []
  });
});

it('allows line height as multiple', function () {
  expect((0, _2.default)([['font', '16px/1.5 "Helvetica"']])).toEqual({
    fontFamily: 'Helvetica',
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontVariant: [],
    lineHeight: 24
  });
});

it('transforms font without quotes', function () {
  expect((0, _2.default)([['font', 'bold italic small-caps 16px/18px Helvetica Neue']])).toEqual({
    fontFamily: 'Helvetica Neue',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontVariant: ['small-caps'],
    lineHeight: 18
  });
});