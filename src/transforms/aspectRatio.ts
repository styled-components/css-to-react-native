import type TokenStream from '../TokenStream'
import { NUMBER, SLASH } from '../tokenTypes'
import type { Style } from '../types'

export default (tokenStream: TokenStream): Style => {
  let aspectRatio = Number(tokenStream.expect(NUMBER))

  if (tokenStream.hasTokens()) {
    tokenStream.expect(SLASH)
    aspectRatio /= Number(tokenStream.expect(NUMBER))
  }

  return { aspectRatio }
}
