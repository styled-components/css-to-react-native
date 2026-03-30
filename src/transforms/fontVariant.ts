import type TokenStream from '../TokenStream'
import { IDENT, SPACE } from '../tokenTypes'
import type { Style } from '../types'

export default (tokenStream: TokenStream): Style => {
  const values = [String(tokenStream.expect(IDENT))]

  while (tokenStream.hasTokens()) {
    tokenStream.expect(SPACE)
    values.push(String(tokenStream.expect(IDENT)))
  }

  return {
    fontVariant: values,
  }
}
