const { tokens } = require('../tokenTypes');

const { NONE, SPACE, WORD, LENGTH } = tokens;

module.exports = (tokenStream) => {
  let offsetX;
  let offsetY;
  let blurRadius;
  let color;

  if (tokenStream.matches(NONE)) {
    tokenStream.expectEmpty();
    return {
      $merge: { shadowOffset: { width: 0, height: 0 }, shadowRadius: 0, shadowColor: 'black' },
    };
  }

  let didParseFirst = false;
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
    } else if (color === undefined && (
      tokenStream.matchesFunction() || tokenStream.matches(WORD)
    )) {
      color = String(tokenStream.lastValue);
    } else {
      tokenStream.throw();
    }

    didParseFirst = true;
  }

  if (offsetX === undefined) tokenStream.throw();

  const $merge = {
    shadowOffset: { width: offsetX, height: offsetY },
    shadowRadius: blurRadius !== undefined ? blurRadius : 0,
    shadowColor: color !== undefined ? color : 'black',
  };
  return { $merge };
};
