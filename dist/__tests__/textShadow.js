'use strict';

var _ = require('..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('textShadow with all values', function () {
  expect((0, _2.default)([['text-shadow', '10px 20px 30px red']])).toEqual({
    textShadowOffset: { width: 10, height: 20 },
    textShadowRadius: 30,
    textShadowColor: 'red'
  });
});

it('textShadow omitting blur', function () {
  expect((0, _2.default)([['text-shadow', '10px 20px red']])).toEqual({
    textShadowOffset: { width: 10, height: 20 },
    textShadowRadius: 0,
    textShadowColor: 'red'
  });
});

it('textShadow omitting color', function () {
  expect((0, _2.default)([['text-shadow', '10px 20px']])).toEqual({
    textShadowOffset: { width: 10, height: 20 },
    textShadowRadius: 0,
    textShadowColor: 'black'
  });
});

it('textShadow enforces offset-x and offset-y', function () {
  expect(function () {
    return (0, _2.default)([['text-shadow', 'red']]);
  }).toThrow();
  expect(function () {
    return (0, _2.default)([['text-shadow', '10px red']]);
  }).toThrow();
});