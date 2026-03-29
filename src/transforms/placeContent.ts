import type TokenStream from '../TokenStream'
import { regExpToken, SPACE } from '../tokenTypes'
import type { Style } from '../types'

const ALIGN_CONTENT = regExpToken(
  /(flex-(?:start|end)|center|stretch|space-(?:between|around))/
)
const JUSTIFY_CONTENT = regExpToken(
  /(flex-(?:start|end)|center|space-(?:between|around|evenly))/
)

export default (tokenStream: TokenStream): Style => {
  const alignContent = String(tokenStream.expect(ALIGN_CONTENT))

  let justifyContent: string
  if (tokenStream.hasTokens()) {
    tokenStream.expect(SPACE)
    justifyContent = String(tokenStream.expect(JUSTIFY_CONTENT))
  } else {
    justifyContent = 'stretch'
  }

  tokenStream.expectEmpty()

  return { alignContent, justifyContent }
}
