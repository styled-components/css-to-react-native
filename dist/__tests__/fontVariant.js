'use strict';

var _ = require('..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('transforms font variant as an array', function () {
  expect((0, _2.default)([['font-variant', 'tabular-nums']])).toEqual({
    fontVariant: ['tabular-nums']
  });
});