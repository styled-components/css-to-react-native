'use strict';

var _ = require('..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('transforms a single transform value with number', function () {
  expect((0, _2.default)([['transform', 'scaleX(5)']])).toEqual({
    transform: [{ scaleX: 5 }]
  });
});

it('transforms a single transform value with string', function () {
  expect((0, _2.default)([['transform', 'rotate(5deg)']])).toEqual({
    transform: [{ rotate: '5deg' }]
  });
});

it('transforms multiple transform values', function () {
  expect((0, _2.default)([['transform', 'scaleX(5) skewX(1deg)']])).toEqual({
    transform: [{ skewX: '1deg' }, { scaleX: 5 }]
  });
});

it('transforms scale(number, number) to scaleX and scaleY', function () {
  expect((0, _2.default)([['transform', 'scale(2, 3)']])).toEqual({
    transform: [{ scaleY: 3 }, { scaleX: 2 }]
  });
});

it('transforms scale(number) to scale', function () {
  expect((0, _2.default)([['transform', 'scale(5)']])).toEqual({
    transform: [{ scale: 5 }]
  });
});

it('transforms translate(length, length) to translateX and translateY', function () {
  expect((0, _2.default)([['transform', 'translate(2px, 3px)']])).toEqual({
    transform: [{ translateY: 3 }, { translateX: 2 }]
  });
});

it('transforms translate(length) to translateX and translateY', function () {
  expect((0, _2.default)([['transform', 'translate(5px)']])).toEqual({
    transform: [{ translateY: 0 }, { translateX: 5 }]
  });
});

it('transforms skew(angle, angle) to skewX and skewY', function () {
  expect((0, _2.default)([['transform', 'skew(2deg, 3deg)']])).toEqual({
    transform: [{ skewY: '3deg' }, { skewX: '2deg' }]
  });
});

it('transforms skew(angle) to skewX and skewY', function () {
  expect((0, _2.default)([['transform', 'skew(5deg)']])).toEqual({
    transform: [{ skewY: '0deg' }, { skewX: '5deg' }]
  });
});