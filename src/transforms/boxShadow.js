const { tokens } = require('../tokenTypes')

const { NONE, SPACE, COLOR, LENGTH } = tokens

module.exports = tokenStream => {
  let offsetX
  let offsetY
  let blurRadius
  let color

  if (tokenStream.matches(NONE)) {
    tokenStream.expectEmpty()
    return {
      $merge: {
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 0,
        shadowColor: 'black',
        shadowOpacity: 1,
      },
    }
  }

  let didParseFirst = false
  while (tokenStream.hasTokens()) {
    if (didParseFirst) tokenStream.expect(SPACE)

    if (offsetX === undefined && tokenStream.matches(LENGTH)) {
      offsetX = tokenStream.lastValue
      tokenStream.expect(SPACE)
      offsetY = tokenStream.expect(LENGTH)

      tokenStream.saveRewindPoint()
      if (tokenStream.matches(SPACE) && tokenStream.matches(LENGTH)) {
        blurRadius = tokenStream.lastValue
      } else {
        tokenStream.rewind()
      }
    } else if (color === undefined && tokenStream.matches(COLOR)) {
      color = tokenStream.lastValue
    } else {
      tokenStream.throw()
    }

    didParseFirst = true
  }

  if (offsetX === undefined) tokenStream.throw()

  const $merge = {
    shadowOffset: { width: offsetX, height: offsetY },
    shadowRadius: blurRadius !== undefined ? blurRadius : 0,
    shadowColor: color !== undefined ? color : 'black',
    shadowOpacity: 1,
  }
  return { $merge }
}
