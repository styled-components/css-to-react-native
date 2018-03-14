'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tokenTypes = require('../tokenTypes');

var SPACE = _tokenTypes.tokens.SPACE,
    IDENT = _tokenTypes.tokens.IDENT,
    STRING = _tokenTypes.tokens.STRING;

exports.default = function (tokenStream) {
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