'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tokenTypes = require('../tokenTypes');

var SPACE = _tokenTypes.tokens.SPACE,
    LINE = _tokenTypes.tokens.LINE,
    COLOR = _tokenTypes.tokens.COLOR;


var STYLE = (0, _tokenTypes.regExpToken)(/^(solid|double|dotted|dashed)$/);

var defaultTextDecorationLine = 'none';
var defaultTextDecorationStyle = 'solid';
var defaultTextDecorationColor = 'black';

exports.default = function (tokenStream) {
  var line = void 0;
  var style = void 0;
  var color = void 0;

  var didParseFirst = false;
  while (tokenStream.hasTokens()) {
    if (didParseFirst) tokenStream.expect(SPACE);

    if (line === undefined && tokenStream.matches(LINE)) {
      var lines = [tokenStream.lastValue.toLowerCase()];

      tokenStream.saveRewindPoint();
      if (lines[0] !== 'none' && tokenStream.matches(SPACE) && tokenStream.matches(LINE)) {
        lines.push(tokenStream.lastValue.toLowerCase());
        // Underline comes before line-through
        lines.sort().reverse();
      } else {
        tokenStream.rewind();
      }

      line = lines.join(' ');
    } else if (style === undefined && tokenStream.matches(STYLE)) {
      style = tokenStream.lastValue;
    } else if (color === undefined && tokenStream.matches(COLOR)) {
      color = tokenStream.lastValue;
    } else {
      tokenStream.throw();
    }

    didParseFirst = true;
  }

  var $merge = {
    textDecorationLine: line !== undefined ? line : defaultTextDecorationLine,
    textDecorationColor: color !== undefined ? color : defaultTextDecorationColor,
    textDecorationStyle: style !== undefined ? style : defaultTextDecorationStyle
  };
  return { $merge: $merge };
};