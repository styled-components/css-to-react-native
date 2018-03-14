'use strict';

var _ = require('..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('transforms font weights as strings', function () {
  expect((0, _2.default)([['font-weight', '400']])).toEqual({ fontWeight: '400' });
  expect((0, _2.default)([['font-weight', 'bold']])).toEqual({
    fontWeight: 'bold'
  });
});