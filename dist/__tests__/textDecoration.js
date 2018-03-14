'use strict';

var _ = require('..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('transforms text-decoration into text-decoration- properties', function () {
  expect((0, _2.default)([['text-decoration', 'underline dotted red']])).toEqual({
    textDecorationLine: 'underline',
    textDecorationStyle: 'dotted',
    textDecorationColor: 'red'
  });
});

it('transforms text-decoration without color', function () {
  expect((0, _2.default)([['text-decoration', 'underline dotted']])).toEqual({
    textDecorationLine: 'underline',
    textDecorationStyle: 'dotted',
    textDecorationColor: 'black'
  });
});

it('transforms text-decoration without style', function () {
  expect((0, _2.default)([['text-decoration', 'underline red']])).toEqual({
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: 'red'
  });
});

it('transforms text-decoration without style and color', function () {
  expect((0, _2.default)([['text-decoration', 'underline']])).toEqual({
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: 'black'
  });
});

it('transforms text-decoration with two line properties', function () {
  expect((0, _2.default)([['text-decoration', 'underline line-through dashed red']])).toEqual({
    textDecorationLine: 'underline line-through',
    textDecorationStyle: 'dashed',
    textDecorationColor: 'red'
  });
});

it('transforms text-decoration in different order', function () {
  expect((0, _2.default)([['text-decoration', 'dashed red underline line-through']])).toEqual({
    textDecorationLine: 'underline line-through',
    textDecorationStyle: 'dashed',
    textDecorationColor: 'red'
  });
});

it('transforms text-decoration with ine in different order', function () {
  expect((0, _2.default)([['text-decoration', 'line-through underline']])).toEqual({
    textDecorationLine: 'underline line-through',
    textDecorationStyle: 'solid',
    textDecorationColor: 'black'
  });
});

it('transforms text-decoration with none', function () {
  expect((0, _2.default)([['text-decoration', 'none']])).toEqual({
    textDecorationLine: 'none',
    textDecorationStyle: 'solid',
    textDecorationColor: 'black'
  });
});

it('transforms text-decoration with none as part of multiple terms', function () {
  expect((0, _2.default)([['text-decoration', 'yellow none']])).toEqual({
    textDecorationLine: 'none',
    textDecorationStyle: 'solid',
    textDecorationColor: 'yellow'
  });
});

it('transforms text-decoration with none in capitals', function () {
  expect((0, _2.default)([['text-decoration', 'yellow NONE']])).toEqual({
    textDecorationLine: 'none',
    textDecorationStyle: 'solid',
    textDecorationColor: 'yellow'
  });
});

it('transforms text-decoration with style in capitals', function () {
  expect((0, _2.default)([['text-decoration', 'yellow UNDERLINE LINE-THROUGH']])).toEqual({
    textDecorationLine: 'underline line-through',
    textDecorationStyle: 'solid',
    textDecorationColor: 'yellow'
  });
});

it('does not transform text-decoration if multiple colors are used', function () {
  expect(function () {
    return (0, _2.default)([['text-decoration', 'underline red yellow']]);
  }).toThrow();
});