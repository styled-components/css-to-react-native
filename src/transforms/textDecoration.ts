import type TokenStream from '../TokenStream'
import { COLOR, LINE, regExpToken, SPACE } from '../tokenTypes'
import type { Style } from '../types'

const STYLE = regExpToken(/^(solid|double|dotted|dashed)$/)

const defaultTextDecorationLine = 'none'
const defaultTextDecorationStyle = 'solid'
const defaultTextDecorationColor = 'black'

export default (tokenStream: TokenStream): Style => {
  let line: string | undefined
  let style: string | undefined
  let color: string | undefined

  let didParseFirst = false
  while (tokenStream.hasTokens()) {
    if (didParseFirst) tokenStream.expect(SPACE)

    if (line === undefined && tokenStream.matches(LINE)) {
      const lines = [String(tokenStream.lastValue).toLowerCase()]

      tokenStream.saveRewindPoint()
      if (
        lines[0] !== 'none' &&
        tokenStream.matches(SPACE) &&
        tokenStream.matches(LINE)
      ) {
        lines.push(String(tokenStream.lastValue).toLowerCase())
        // Underline comes before line-through
        lines.sort().reverse()
      } else {
        tokenStream.rewind()
      }

      line = lines.join(' ')
    } else if (style === undefined && tokenStream.matches(STYLE)) {
      style = String(tokenStream.lastValue)
    } else if (color === undefined && tokenStream.matches(COLOR)) {
      color = String(tokenStream.lastValue)
    } else {
      tokenStream.throw()
    }

    didParseFirst = true
  }

  return {
    textDecorationLine: line !== undefined ? line : defaultTextDecorationLine,
    textDecorationColor:
      color !== undefined ? color : defaultTextDecorationColor,
    textDecorationStyle:
      style !== undefined ? style : defaultTextDecorationStyle,
  }
}
