import type TokenStream from '../TokenStream'
import { IDENT, SPACE, STRING } from '../tokenTypes'

export default (tokenStream: TokenStream): { fontFamily: string } => {
  let fontFamily: string

  if (tokenStream.matches(STRING)) {
    fontFamily = String(tokenStream.lastValue)
  } else {
    fontFamily = String(tokenStream.expect(IDENT))
    while (tokenStream.hasTokens()) {
      tokenStream.expect(SPACE)
      const nextIdent = String(tokenStream.expect(IDENT))
      fontFamily += ` ${nextIdent}`
    }
  }

  tokenStream.expectEmpty()

  return { fontFamily }
}
