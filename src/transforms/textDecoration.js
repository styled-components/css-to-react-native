import { regExpToken, tokens } from '../tokenTypes'

const { NONE, SPACE, LINE, COLOR } = tokens

const STYLE = regExpToken(/^(solid|double|dotted|dashed)$/)

const defaultTextDecorationLine = 'none'
const defaultTextDecorationStyle = 'solid'
const defaultTextDecorationColor = 'black'

module.exports = tokenStream => {
  let line
  let style
  let color

  if (tokenStream.matches(NONE)) {
    tokenStream.expectEmpty()
    return {
      $merge: {
        textDecorationLine: defaultTextDecorationLine,
        textDecorationStyle: defaultTextDecorationStyle,
        textDecorationColor: defaultTextDecorationColor,
      },
    }
  }

  let didParseFirst = false
  while (tokenStream.hasTokens()) {
    if (didParseFirst) tokenStream.expect(SPACE)

    if (line === undefined && tokenStream.matches(LINE)) {
      line = tokenStream.lastValue

      tokenStream.saveRewindPoint()
      if (tokenStream.matches(SPACE) && tokenStream.matches(LINE)) {
        line += ` ${tokenStream.lastValue}`
      } else {
        tokenStream.rewind()
      }
    } else if (style === undefined && tokenStream.matches(STYLE)) {
      style = tokenStream.lastValue
    } else if (color === undefined && tokenStream.matches(COLOR)) {
      color = tokenStream.lastValue
    } else {
      tokenStream.throw()
    }

    didParseFirst = true
  }

  const $merge = {
    textDecorationLine: line !== undefined ? line : defaultTextDecorationLine,
    textDecorationColor:
      color !== undefined ? color : defaultTextDecorationColor,
    textDecorationStyle:
      style !== undefined ? style : defaultTextDecorationStyle,
  }
  return { $merge }
}
