'use strict';

var _ = require('..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('transforms shadow offsets', function () {
  expect((0, _2.default)([['shadow-offset', '10px 5px']])).toEqual({
    shadowOffset: { width: 10, height: 5 }
  });
});

it('transforms text shadow offsets', function () {
  expect((0, _2.default)([['text-shadow-offset', '10px 5px']])).toEqual({
    textShadowOffset: { width: 10, height: 5 }
  });
});