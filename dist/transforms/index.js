'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tokenTypes = require('../tokenTypes');

var _boxShadow = require('./boxShadow');

var _boxShadow2 = _interopRequireDefault(_boxShadow);

var _flex = require('./flex');

var _flex2 = _interopRequireDefault(_flex);

var _font = require('./font');

var _font2 = _interopRequireDefault(_font);

var _fontFamily = require('./fontFamily');

var _fontFamily2 = _interopRequireDefault(_fontFamily);

var _textShadow = require('./textShadow');

var _textShadow2 = _interopRequireDefault(_textShadow);

var _textDecoration = require('./textDecoration');

var _textDecoration2 = _interopRequireDefault(_textDecoration);

var _textDecorationLine = require('./textDecorationLine');

var _textDecorationLine2 = _interopRequireDefault(_textDecorationLine);

var _transform = require('./transform');

var _transform2 = _interopRequireDefault(_transform);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IDENT = _tokenTypes.tokens.IDENT,
    WORD = _tokenTypes.tokens.WORD,
    COLOR = _tokenTypes.tokens.COLOR,
    LENGTH = _tokenTypes.tokens.LENGTH,
    PERCENT = _tokenTypes.tokens.PERCENT,
    AUTO = _tokenTypes.tokens.AUTO;


var background = function background(tokenStream) {
  return {
    $merge: { backgroundColor: tokenStream.expect(COLOR) }
  };
};
var border = (0, _util.anyOrderFactory)({
  borderWidth: {
    token: _tokenTypes.tokens.LENGTH,
    default: 1
  },
  borderColor: {
    token: COLOR,
    default: 'black'
  },
  borderStyle: {
    token: (0, _tokenTypes.regExpToken)(/^(solid|dashed|dotted)$/),
    default: 'solid'
  }
});
var borderColor = (0, _util.directionFactory)({
  types: [WORD],
  prefix: 'border',
  suffix: 'Color'
});
var borderRadius = (0, _util.directionFactory)({
  directions: ['TopLeft', 'TopRight', 'BottomRight', 'BottomLeft'],
  prefix: 'border',
  suffix: 'Radius'
});
var borderWidth = (0, _util.directionFactory)({ prefix: 'border', suffix: 'Width' });
var margin = (0, _util.directionFactory)({
  types: [LENGTH, PERCENT, AUTO],
  prefix: 'margin'
});
var padding = (0, _util.directionFactory)({ prefix: 'padding' });
var flexFlow = (0, _util.anyOrderFactory)({
  flexWrap: {
    token: (0, _tokenTypes.regExpToken)(/(nowrap|wrap|wrap-reverse)/),
    default: 'nowrap'
  },
  flexDirection: {
    token: (0, _tokenTypes.regExpToken)(/(row|row-reverse|column|column-reverse)/),
    default: 'row'
  }
});
var fontVariant = function fontVariant(tokenStream) {
  return [tokenStream.expect(IDENT)];
};
var fontWeight = function fontWeight(tokenStream) {
  return tokenStream.expect(WORD);
}; // Also match numbers as strings
var shadowOffset = (0, _util.shadowOffsetFactory)();
var textShadowOffset = (0, _util.shadowOffsetFactory)();

exports.default = {
  background: background,
  border: border,
  borderColor: borderColor,
  borderRadius: borderRadius,
  borderWidth: borderWidth,
  boxShadow: _boxShadow2.default,
  flex: _flex2.default,
  flexFlow: flexFlow,
  font: _font2.default,
  fontFamily: _fontFamily2.default,
  fontVariant: fontVariant,
  fontWeight: fontWeight,
  margin: margin,
  padding: padding,
  shadowOffset: shadowOffset,
  textShadow: _textShadow2.default,
  textShadowOffset: textShadowOffset,
  textDecoration: _textDecoration2.default,
  textDecorationLine: _textDecorationLine2.default,
  transform: _transform2.default
};