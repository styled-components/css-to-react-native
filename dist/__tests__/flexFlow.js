'use strict';

var _ = require('..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('transforms flexFlow shorthand with two values', function () {
  expect((0, _2.default)([['flex-flow', 'column wrap']])).toEqual({
    flexDirection: 'column',
    flexWrap: 'wrap'
  });
});

it('transforms flexFlow shorthand missing flexDirection', function () {
  expect((0, _2.default)([['flex-flow', 'wrap']])).toEqual({
    flexDirection: 'row',
    flexWrap: 'wrap'
  });
});

it('transforms flexFlow shorthand missing flexWrap', function () {
  expect((0, _2.default)([['flex-flow', 'column']])).toEqual({
    flexDirection: 'column',
    flexWrap: 'nowrap'
  });
});