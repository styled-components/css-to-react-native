'use strict';

var _require = require('../tokenTypes'),
    regExpToken = _require.regExpToken,
    tokens = _require.tokens;

var boxShadow = require('./boxShadow');
var flex = require('./flex');
var font = require('./font');
var fontFamily = require('./fontFamily');
var transform = require('./transform');

var _require2 = require('./util'),
    directionFactory = _require2.directionFactory,
    anyOrderFactory = _require2.anyOrderFactory,
    shadowOffsetFactory = _require2.shadowOffsetFactory;

var IDENT = tokens.IDENT,
    WORD = tokens.WORD,
    COLOR = tokens.COLOR;


var background = function background(tokenStream) {
  return { $merge: { backgroundColor: tokenStream.expect(COLOR) } };
};
var border = anyOrderFactory({
  borderWidth: {
    token: tokens.LENGTH,
    default: 1
  },
  borderColor: {
    token: COLOR,
    default: 'black'
  },
  borderStyle: {
    token: regExpToken(/^(solid|dashed|dotted)$/),
    default: 'solid'
  }
});
var borderColor = directionFactory({
  types: [WORD],
  prefix: 'border',
  suffix: 'Color'
});
var borderRadius = directionFactory({
  directions: ['TopRight', 'BottomRight', 'BottomLeft', 'TopLeft'],
  prefix: 'border',
  suffix: 'Radius'
});
var borderWidth = directionFactory({ prefix: 'border', suffix: 'Width' });
var margin = directionFactory({ prefix: 'margin' });
var padding = directionFactory({ prefix: 'padding' });
var flexFlow = anyOrderFactory({
  flexWrap: {
    token: regExpToken(/(nowrap|wrap|wrap-reverse)/),
    default: 'nowrap'
  },
  flexDirection: {
    token: regExpToken(/(row|row-reverse|column|column-reverse)/),
    default: 'row'
  }
});
var fontVariant = function fontVariant(tokenStream) {
  return [tokenStream.expect(IDENT)];
};
var fontWeight = function fontWeight(tokenStream) {
  return tokenStream.expect(WORD);
}; // Also match numbers as strings
var shadowOffset = shadowOffsetFactory();
var textShadowOffset = shadowOffsetFactory();

module.exports = {
  background: background,
  border: border,
  borderColor: borderColor,
  borderRadius: borderRadius,
  borderWidth: borderWidth,
  boxShadow: boxShadow,
  flex: flex,
  flexFlow: flexFlow,
  font: font,
  fontFamily: fontFamily,
  fontVariant: fontVariant,
  fontWeight: fontWeight,
  margin: margin,
  padding: padding,
  shadowOffset: shadowOffset,
  textShadowOffset: textShadowOffset,
  transform: transform
};