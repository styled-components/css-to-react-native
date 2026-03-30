import type TokenStream from '../TokenStream'
import { regExpToken, SPACE } from '../tokenTypes'
import type { Style } from '../types'

const FLEX_WRAP = regExpToken(/(nowrap|wrap|wrap-reverse)/)
const FLEX_DIRECTION = regExpToken(/(row|row-reverse|column|column-reverse)/)

const defaultFlexWrap = 'nowrap'
const defaultFlexDirection = 'row'

export default (tokenStream: TokenStream): Style => {
  let flexWrap: string | undefined
  let flexDirection: string | undefined

  let partsParsed = 0
  while (partsParsed < 2 && tokenStream.hasTokens()) {
    if (partsParsed !== 0) tokenStream.expect(SPACE)

    if (flexWrap === undefined && tokenStream.matches(FLEX_WRAP)) {
      flexWrap = String(tokenStream.lastValue)
    } else if (
      flexDirection === undefined &&
      tokenStream.matches(FLEX_DIRECTION)
    ) {
      flexDirection = String(tokenStream.lastValue)
    } else {
      tokenStream.throw()
    }

    partsParsed += 1
  }

  tokenStream.expectEmpty()

  if (flexWrap === undefined) flexWrap = defaultFlexWrap
  if (flexDirection === undefined) flexDirection = defaultFlexDirection

  return { flexWrap, flexDirection }
}
