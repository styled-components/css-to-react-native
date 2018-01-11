'use strict';

var _require = require('../tokenTypes'),
    tokens = _require.tokens;

var NONE = tokens.NONE,
    SPACE = tokens.SPACE,
    WORD = tokens.WORD,
    LENGTH = tokens.LENGTH;


module.exports = function (tokenStream) {
  var offsetX = void 0;
  var offsetY = void 0;
  var blurRadius = void 0;
  var color = void 0;

  if (tokenStream.matches(NONE)) {
    tokenStream.expectEmpty();
    return {
      $merge: { shadowOffset: { width: 0, height: 0 }, shadowRadius: 0, shadowColor: 'black' }
    };
  }

  var didParseFirst = false;
  while (tokenStream.hasTokens()) {
    if (didParseFirst) tokenStream.expect(SPACE);

    if (offsetX === undefined && tokenStream.matches(LENGTH)) {
      offsetX = tokenStream.lastValue;
      tokenStream.expect(SPACE);
      offsetY = tokenStream.expect(LENGTH);

      if (tokenStream.lookAhead().matches(LENGTH)) {
        tokenStream.expect(SPACE);
        blurRadius = tokenStream.expect(LENGTH);
      }
    } else if (color === undefined && (tokenStream.matchesFunction() || tokenStream.matches(WORD))) {
      color = String(tokenStream.lastValue);
    } else {
      tokenStream.throw();
    }

    didParseFirst = true;
  }

  if (offsetX === undefined) tokenStream.throw();

  var $merge = {
    shadowOffset: { width: offsetX, height: offsetY },
    shadowRadius: blurRadius !== undefined ? blurRadius : 0,
    shadowColor: color !== undefined ? color : 'black'
  };
  return { $merge: $merge };
};