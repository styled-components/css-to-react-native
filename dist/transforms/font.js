'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fontFamily = require('./fontFamily');

var _fontFamily2 = _interopRequireDefault(_fontFamily);

var _tokenTypes = require('../tokenTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SPACE = _tokenTypes.tokens.SPACE,
    LENGTH = _tokenTypes.tokens.LENGTH,
    NUMBER = _tokenTypes.tokens.NUMBER,
    SLASH = _tokenTypes.tokens.SLASH;

var NORMAL = (0, _tokenTypes.regExpToken)(/^(normal)$/);
var STYLE = (0, _tokenTypes.regExpToken)(/^(italic)$/);
var WEIGHT = (0, _tokenTypes.regExpToken)(/^([1-9]00|bold)$/);
var VARIANT = (0, _tokenTypes.regExpToken)(/^(small-caps)$/);

var defaultFontStyle = 'normal';
var defaultFontWeight = 'normal';
var defaultFontVariant = [];

exports.default = function (tokenStream) {
  var fontStyle = void 0;
  var fontWeight = void 0;
  var fontVariant = void 0;
  // let fontSize;
  var lineHeight = void 0;
  // let fontFamily;

  var numStyleWeightVariantMatched = 0;
  while (numStyleWeightVariantMatched < 3 && tokenStream.hasTokens()) {
    if (tokenStream.matches(NORMAL)) {
      /* pass */
    } else if (fontStyle === undefined && tokenStream.matches(STYLE)) {
      fontStyle = tokenStream.lastValue;
    } else if (fontWeight === undefined && tokenStream.matches(WEIGHT)) {
      fontWeight = tokenStream.lastValue;
    } else if (fontVariant === undefined && tokenStream.matches(VARIANT)) {
      fontVariant = [tokenStream.lastValue];
    } else {
      break;
    }

    tokenStream.expect(SPACE);
    numStyleWeightVariantMatched += 1;
  }

  var fontSize = tokenStream.expect(LENGTH);

  if (tokenStream.matches(SLASH)) {
    if (tokenStream.matches(NUMBER)) {
      lineHeight = fontSize * tokenStream.lastValue;
    } else {
      lineHeight = tokenStream.expect(LENGTH);
    }
  }

  tokenStream.expect(SPACE);

  var fontFamily = (0, _fontFamily2.default)(tokenStream);

  if (fontStyle === undefined) fontStyle = defaultFontStyle;
  if (fontWeight === undefined) fontWeight = defaultFontWeight;
  if (fontVariant === undefined) fontVariant = defaultFontVariant;

  var out = { fontStyle: fontStyle, fontWeight: fontWeight, fontVariant: fontVariant, fontSize: fontSize, fontFamily: fontFamily };
  if (lineHeight !== undefined) out.lineHeight = lineHeight;

  return { $merge: out };
};