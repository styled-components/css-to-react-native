'use strict';

var _ = require('..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('transforms margin, padding with 1 value', function () {
  expect((0, _2.default)([['margin', '1px']])).toEqual({
    marginTop: 1,
    marginRight: 1,
    marginBottom: 1,
    marginLeft: 1
  });
  expect((0, _2.default)([['padding', '1px']])).toEqual({
    paddingTop: 1,
    paddingRight: 1,
    paddingBottom: 1,
    paddingLeft: 1
  });
});

it('transforms margin, padding with 2 values', function () {
  expect((0, _2.default)([['margin', '1px 2px']])).toEqual({
    marginTop: 1,
    marginRight: 2,
    marginBottom: 1,
    marginLeft: 2
  });
  expect((0, _2.default)([['padding', '1px 2px']])).toEqual({
    paddingTop: 1,
    paddingRight: 2,
    paddingBottom: 1,
    paddingLeft: 2
  });
});

it('transforms margin, padding with 3 values', function () {
  expect((0, _2.default)([['margin', '1px 2px 3px']])).toEqual({
    marginTop: 1,
    marginRight: 2,
    marginBottom: 3,
    marginLeft: 2
  });
  expect((0, _2.default)([['padding', '1px 2px 3px']])).toEqual({
    paddingTop: 1,
    paddingRight: 2,
    paddingBottom: 3,
    paddingLeft: 2
  });
});

it('transforms margin, padding with 4 values', function () {
  expect((0, _2.default)([['margin', '1px 2px 3px 4px']])).toEqual({
    marginTop: 1,
    marginRight: 2,
    marginBottom: 3,
    marginLeft: 4
  });
  expect((0, _2.default)([['padding', '1px 2px 3px 4px']])).toEqual({
    paddingTop: 1,
    paddingRight: 2,
    paddingBottom: 3,
    paddingLeft: 4
  });
});

it('transforms margin, allowing unitless zero, percentages', function () {
  expect((0, _2.default)([['margin', '0 0% 10% 100%']])).toEqual({
    marginTop: 0,
    marginRight: '0%',
    marginBottom: '10%',
    marginLeft: '100%'
  });
  expect((0, _2.default)([['padding', '0 0% 10% 100%']])).toEqual({
    paddingTop: 0,
    paddingRight: '0%',
    paddingBottom: '10%',
    paddingLeft: '100%'
  });
});

it('transforms shorthand and overrides previous values', function () {
  expect((0, _2.default)([['margin-top', '2px'], ['margin', '1px']])).toEqual({
    marginTop: 1,
    marginRight: 1,
    marginBottom: 1,
    marginLeft: 1
  });
});

it('transforms margin shorthand with auto', function () {
  expect((0, _2.default)([['margin', 'auto']])).toEqual({
    marginTop: 'auto',
    marginRight: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto'
  });
  expect((0, _2.default)([['margin', '0 auto']])).toEqual({
    marginTop: 0,
    marginRight: 'auto',
    marginBottom: 0,
    marginLeft: 'auto'
  });
  expect((0, _2.default)([['margin', 'auto 0']])).toEqual({
    marginTop: 'auto',
    marginRight: 0,
    marginBottom: 'auto',
    marginLeft: 0
  });
  expect((0, _2.default)([['margin', '2px 3px auto']])).toEqual({
    marginTop: 2,
    marginRight: 3,
    marginBottom: 'auto',
    marginLeft: 3
  });
  expect((0, _2.default)([['margin', '10px auto 4px']])).toEqual({
    marginTop: 10,
    marginRight: 'auto',
    marginBottom: 4,
    marginLeft: 'auto'
  });
});

it('transforms border width', function () {
  expect((0, _2.default)([['border-width', '1px 2px 3px 4px']])).toEqual({
    borderTopWidth: 1,
    borderRightWidth: 2,
    borderBottomWidth: 3,
    borderLeftWidth: 4
  });
});

it('transforms border radius', function () {
  expect((0, _2.default)([['border-radius', '1px 2px 3px 4px']])).toEqual({
    borderTopLeftRadius: 1,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 3,
    borderBottomLeftRadius: 4
  });
});