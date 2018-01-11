'use strict';

var _require = require('../tokenTypes'),
    tokens = _require.tokens;

var SPACE = tokens.SPACE,
    IDENT = tokens.IDENT,
    STRING = tokens.STRING;


module.exports = function (tokenStream) {
  var fontFamily = void 0;

  if (tokenStream.matches(STRING)) {
    fontFamily = tokenStream.lastValue;
  } else {
    fontFamily = tokenStream.expect(IDENT);
    while (tokenStream.hasTokens()) {
      tokenStream.expect(SPACE);
      var nextIdent = tokenStream.expect(IDENT);
      fontFamily += ' ' + nextIdent;
    }
  }

  tokenStream.expectEmpty();

  return fontFamily;
};