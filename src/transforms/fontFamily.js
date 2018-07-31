import { tokens } from '../tokenTypes'

const { SPACE, IDENT, STRING, VARIABLE } = tokens

export default tokenStream => {
  let fontFamily

  if (tokenStream.matches(STRING) || tokenStream.matches(VARIABLE)) {
    fontFamily = tokenStream.lastValue
  } else {
    fontFamily = tokenStream.expect(IDENT)
    while (tokenStream.hasTokens()) {
      tokenStream.expect(SPACE)
      const nextIdent = tokenStream.expect(IDENT)
      fontFamily += ` ${nextIdent}`
    }
  }

  tokenStream.expectEmpty()

  return fontFamily
}
