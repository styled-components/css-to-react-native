'use strict';

var _ = require('..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('transforms text-decoration-line with underline line-through', function () {
  expect((0, _2.default)([['text-decoration-line', 'underline line-through']])).toEqual({
    textDecorationLine: 'underline line-through'
  });
});

it('transforms text-decoration-line with line-through underline', function () {
  expect((0, _2.default)([['text-decoration-line', 'line-through underline']])).toEqual({
    textDecorationLine: 'underline line-through'
  });
});

it('transforms text-decoration-line with none', function () {
  expect((0, _2.default)([['text-decoration-line', 'none']])).toEqual({
    textDecorationLine: 'none'
  });
});