import type TokenStream from '../TokenStream'
import {
  AUTO,
  LENGTH,
  NONE,
  NUMBER,
  PERCENT,
  SPACE,
  UNSUPPORTED_LENGTH_UNIT,
} from '../tokenTypes'
import type { Style } from '../types'

const defaultFlexGrow = 1
const defaultFlexShrink = 1
const defaultFlexBasis = 0

export default (tokenStream: TokenStream): Style => {
  let flexGrow: number | undefined
  let flexShrink: number | undefined
  let flexBasis: string | number | undefined

  if (tokenStream.matches(NONE)) {
    tokenStream.expectEmpty()
    return { flexGrow: 0, flexShrink: 0, flexBasis: 'auto' }
  }

  tokenStream.saveRewindPoint()
  if (tokenStream.matches(AUTO) && !tokenStream.hasTokens()) {
    return { flexGrow: 1, flexShrink: 1, flexBasis: 'auto' }
  }
  tokenStream.rewind()

  let partsParsed = 0
  while (partsParsed < 2 && tokenStream.hasTokens()) {
    if (partsParsed !== 0) tokenStream.expect(SPACE)

    if (flexGrow === undefined && tokenStream.matches(NUMBER)) {
      flexGrow = Number(tokenStream.lastValue)

      tokenStream.saveRewindPoint()
      if (tokenStream.matches(SPACE) && tokenStream.matches(NUMBER)) {
        flexShrink = Number(tokenStream.lastValue)
      } else {
        tokenStream.rewind()
      }
    } else if (
      flexBasis === undefined &&
      tokenStream.matches(LENGTH, UNSUPPORTED_LENGTH_UNIT, PERCENT)
    ) {
      flexBasis = tokenStream.lastValue ?? undefined
    } else if (flexBasis === undefined && tokenStream.matches(AUTO)) {
      flexBasis = 'auto'
    } else {
      tokenStream.throw()
    }

    partsParsed += 1
  }

  tokenStream.expectEmpty()

  if (flexGrow === undefined) flexGrow = defaultFlexGrow
  if (flexShrink === undefined) flexShrink = defaultFlexShrink
  if (flexBasis === undefined) flexBasis = defaultFlexBasis

  return { flexGrow, flexShrink, flexBasis }
}
