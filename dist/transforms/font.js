'use strict';

var parseFontFamily = require('./fontFamily');

var _require = require('../tokenTypes'),
    regExpToken = _require.regExpToken,
    tokens = _require.tokens;

var SPACE = tokens.SPACE,
    LENGTH = tokens.LENGTH,
    NUMBER = tokens.NUMBER,
    SLASH = tokens.SLASH;

var NORMAL = regExpToken(/^(normal)$/);
var STYLE = regExpToken(/^(italic)$/);
var WEIGHT = regExpToken(/^([1-9]00|bold)$/);
var VARIANT = regExpToken(/^(small-caps)$/);

var defaultFontStyle = 'normal';
var defaultFontWeight = 'normal';
var defaultFontVariant = [];

module.exports = function (tokenStream) {
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

  var fontFamily = parseFontFamily(tokenStream);

  if (fontStyle === undefined) fontStyle = defaultFontStyle;
  if (fontWeight === undefined) fontWeight = defaultFontWeight;
  if (fontVariant === undefined) fontVariant = defaultFontVariant;

  var out = { fontStyle: fontStyle, fontWeight: fontWeight, fontVariant: fontVariant, fontSize: fontSize, fontFamily: fontFamily };
  if (lineHeight !== undefined) out.lineHeight = lineHeight;

  return { $merge: out };
};