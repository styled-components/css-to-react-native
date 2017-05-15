const { tokens } = require('../tokenTypes');

const { NONE, NUMBER, LENGTH, SPACE } = tokens;

const defaultFlexGrow = 1;
const defaultFlexShrink = 1;
const defaultFlexBasis = 0;

module.exports = (tokenStream) => {
  let flexGrow;
  let flexShrink;
  let flexBasis;

  if (tokenStream.match(NONE)) {
    tokenStream.expectEmpty();
    return { $merge: { flexGrow: 0, flexShrink: 0 } };
  }

  while (tokenStream.hasTokens()) {
    if (flexGrow === undefined && tokenStream.match(NUMBER) != null) {
      flexGrow = tokenStream.lastValue;
    } else if (flexShrink === undefined && tokenStream.match(NUMBER) != null) {
      flexShrink = tokenStream.lastValue;
    } else if (flexBasis === undefined && tokenStream.match(LENGTH)) {
      flexBasis = tokenStream.lastValue;
    } else {
      tokenStream.throw();
    }

    if (tokenStream.hasTokens()) {
        tokenStream.expect(SPACE);
    } else {
        break;
    }
  }

  tokenStream.expectEmpty();

  if (flexGrow === undefined) flexGrow = defaultFlexGrow;
  if (flexShrink === undefined) flexShrink = defaultFlexShrink;
  if (flexBasis === undefined) flexBasis = defaultFlexBasis;

  return { $merge: { flexGrow, flexShrink, flexBasis } };
};
