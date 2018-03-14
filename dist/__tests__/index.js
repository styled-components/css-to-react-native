'use strict';

var _ = require('..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('transforms numbers', function () {
  expect((0, _2.default)([['top', '0'], ['left', '0'], ['right', '0'], ['bottom', '0']])).toEqual({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  });
});

it('allows pixels in unspecialized transform', function () {
  expect((0, _2.default)([['top', '0px']])).toEqual({ top: 0 });
});

it('allows boolean values', function () {
  expect((0, _2.default)([['boolTrue1', 'true'], ['boolTrue2', 'TRUE'], ['boolFalse1', 'false'], ['boolFalse2', 'FALSE']])).toEqual({
    boolTrue1: true,
    boolTrue2: true,
    boolFalse1: false,
    boolFalse2: false
  });
});

it('allows null values', function () {
  expect((0, _2.default)([['null1', 'null'], ['null2', 'NULL']])).toEqual({
    null1: null,
    null2: null
  });
});

it('allows undefined values', function () {
  expect((0, _2.default)([['undefined1', 'undefined'], ['undefined2', 'UNDEFINED']])).toEqual({
    undefined1: undefined,
    undefined2: undefined
  });
});

it('allows percent in unspecialized transform', function () {
  expect((0, _2.default)([['top', '0%']])).toEqual({ top: '0%' });
});

it('allows decimal values', function () {
  expect((0, _.getStylesForProperty)('margin', '0.5px').marginTop).toBe(0.5);
  expect((0, _.getStylesForProperty)('margin', '1.5px').marginTop).toBe(1.5);
  expect((0, _.getStylesForProperty)('margin', '10.5px').marginTop).toBe(10.5);
  expect((0, _.getStylesForProperty)('margin', '100.5px').marginTop).toBe(100.5);
  expect((0, _.getStylesForProperty)('margin', '-0.5px').marginTop).toBe(-0.5);
  expect((0, _.getStylesForProperty)('margin', '-1.5px').marginTop).toBe(-1.5);
  expect((0, _.getStylesForProperty)('margin', '-10.5px').marginTop).toBe(-10.5);
  expect((0, _.getStylesForProperty)('margin', '-100.5px').marginTop).toBe(-100.5);
  expect((0, _.getStylesForProperty)('margin', '.5px').marginTop).toBe(0.5);
  expect((0, _.getStylesForProperty)('margin', '-.5px').marginTop).toBe(-0.5);
});

it('allows decimal values in transformed values', function () {
  expect((0, _2.default)([['border-radius', '1.5px']])).toEqual({
    borderTopLeftRadius: 1.5,
    borderTopRightRadius: 1.5,
    borderBottomRightRadius: 1.5,
    borderBottomLeftRadius: 1.5
  });
});

it('allows negative values in transformed values', function () {
  expect((0, _2.default)([['border-radius', '-1.5px']])).toEqual({
    borderTopLeftRadius: -1.5,
    borderTopRightRadius: -1.5,
    borderBottomRightRadius: -1.5,
    borderBottomLeftRadius: -1.5
  });
});

it('allows percent values in transformed values', function () {
  expect((0, _2.default)([['margin', '10%']])).toEqual({
    marginTop: '10%',
    marginRight: '10%',
    marginBottom: '10%',
    marginLeft: '10%'
  });
});

it('allows color values in transformed border-color values', function () {
  expect((0, _2.default)([['border-color', 'red']])).toEqual({
    borderTopColor: 'red',
    borderRightColor: 'red',
    borderBottomColor: 'red',
    borderLeftColor: 'red'
  });
});

it('allows omitting units for 0', function () {
  expect((0, _2.default)([['margin', '10px 0']])).toEqual({
    marginTop: 10,
    marginRight: 0,
    marginBottom: 10,
    marginLeft: 0
  });
});

it('transforms strings', function () {
  expect((0, _2.default)([['color', 'red']])).toEqual({ color: 'red' });
});

it('transforms hex colors', function () {
  expect((0, _2.default)([['color', '#f00']])).toEqual({ color: '#f00' });
});

it('transforms rgb colors', function () {
  expect((0, _2.default)([['color', 'rgb(255, 0, 0)']])).toEqual({
    color: 'rgb(255, 0, 0)'
  });
});

it('converts to camel-case', function () {
  expect((0, _2.default)([['background-color', 'red']])).toEqual({
    backgroundColor: 'red'
  });
});

it('transforms background to backgroundColor', function () {
  expect((0, _2.default)([['background', '#f00']])).toEqual({
    backgroundColor: '#f00'
  });
});

it('transforms background to backgroundColor with rgb', function () {
  expect((0, _2.default)([['background', 'rgb(255, 0, 0)']])).toEqual({
    backgroundColor: 'rgb(255, 0, 0)'
  });
});

it('transforms background to backgroundColor with named colour', function () {
  expect((0, _2.default)([['background', 'red']])).toEqual({
    backgroundColor: 'red'
  });
});

it('allows blacklisting shorthands', function () {
  var actualStyles = (0, _2.default)([['border-radius', '50px']], ['borderRadius']);
  expect(actualStyles).toEqual({ borderRadius: 50 });
});

it('throws useful errors', function () {
  expect(function () {
    return (0, _2.default)([['margin', '10']]);
  }).toThrow('Failed to parse declaration "margin: 10"');
});