'use strict';

var _ = require('..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('transforms border shorthand', function () {
  expect((0, _2.default)([['border', '2px dashed #f00']])).toEqual({
    borderWidth: 2,
    borderColor: '#f00',
    borderStyle: 'dashed'
  });
});

it('transforms border shorthand in other order', function () {
  expect((0, _2.default)([['border', '#f00 2px dashed']])).toEqual({
    borderWidth: 2,
    borderColor: '#f00',
    borderStyle: 'dashed'
  });
});

it('transforms border shorthand missing color', function () {
  expect((0, _2.default)([['border', '2px dashed']])).toEqual({
    borderWidth: 2,
    borderColor: 'black',
    borderStyle: 'dashed'
  });
});

it('transforms border shorthand missing style', function () {
  expect((0, _2.default)([['border', '2px #f00']])).toEqual({
    borderWidth: 2,
    borderColor: '#f00',
    borderStyle: 'solid'
  });
});

it('transforms border shorthand missing width', function () {
  expect((0, _2.default)([['border', '#f00 dashed']])).toEqual({
    borderWidth: 1,
    borderColor: '#f00',
    borderStyle: 'dashed'
  });
});

it('transforms border shorthand missing color & width', function () {
  expect((0, _2.default)([['border', 'dashed']])).toEqual({
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'dashed'
  });
});

it('transforms border shorthand missing style & width', function () {
  expect((0, _2.default)([['border', '#f00']])).toEqual({
    borderWidth: 1,
    borderColor: '#f00',
    borderStyle: 'solid'
  });
});

it('transforms border shorthand missing color & style', function () {
  expect((0, _2.default)([['border', '2px']])).toEqual({
    borderWidth: 2,
    borderColor: 'black',
    borderStyle: 'solid'
  });
});