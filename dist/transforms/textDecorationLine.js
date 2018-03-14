'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tokenTypes = require('../tokenTypes');

var SPACE = _tokenTypes.tokens.SPACE,
    LINE = _tokenTypes.tokens.LINE;

exports.default = function (tokenStream) {
  var lines = [];

  var didParseFirst = false;
  while (tokenStream.hasTokens()) {
    if (didParseFirst) tokenStream.expect(SPACE);

    lines.push(tokenStream.expect(LINE).toLowerCase());

    didParseFirst = true;
  }

  lines.sort().reverse();

  return lines.join(' ');
};