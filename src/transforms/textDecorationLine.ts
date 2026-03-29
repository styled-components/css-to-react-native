import type TokenStream from '../TokenStream'
import { LINE, SPACE } from '../tokenTypes'
import type { Style } from '../types'

export default (tokenStream: TokenStream): Style => {
  const lines: string[] = []

  let didParseFirst = false
  while (tokenStream.hasTokens()) {
    if (didParseFirst) tokenStream.expect(SPACE)

    lines.push(String(tokenStream.expect(LINE)).toLowerCase())

    didParseFirst = true
  }

  lines.sort().reverse()

  return { textDecorationLine: lines.join(' ') }
}
