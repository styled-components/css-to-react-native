import type TokenStream from '../TokenStream'
import {
  COLOR,
  LENGTH,
  NONE,
  regExpToken,
  SPACE,
  UNSUPPORTED_LENGTH_UNIT,
} from '../tokenTypes'
import type { Style } from '../types'

const BORDER_STYLE = regExpToken(/^(solid|dashed|dotted)$/)

const defaultBorderWidth = 1
const defaultBorderColor = 'black'
const defaultBorderStyle = 'solid'

export default (tokenStream: TokenStream): Style => {
  let borderWidth: string | number | undefined
  let borderColor: string | undefined
  let borderStyle: string | undefined

  if (tokenStream.matches(NONE)) {
    tokenStream.expectEmpty()
    return { borderWidth: 0, borderColor: 'black', borderStyle: 'solid' }
  }

  let partsParsed = 0
  while (partsParsed < 3 && tokenStream.hasTokens()) {
    if (partsParsed !== 0) tokenStream.expect(SPACE)

    if (
      borderWidth === undefined &&
      tokenStream.matches(LENGTH, UNSUPPORTED_LENGTH_UNIT)
    ) {
      borderWidth = tokenStream.lastValue ?? undefined
    } else if (borderColor === undefined && tokenStream.matches(COLOR)) {
      borderColor = String(tokenStream.lastValue)
    } else if (borderStyle === undefined && tokenStream.matches(BORDER_STYLE)) {
      borderStyle = String(tokenStream.lastValue)
    } else {
      tokenStream.throw()
    }

    partsParsed += 1
  }

  tokenStream.expectEmpty()

  if (borderWidth === undefined) borderWidth = defaultBorderWidth
  if (borderColor === undefined) borderColor = defaultBorderColor
  if (borderStyle === undefined) borderStyle = defaultBorderStyle

  return { borderWidth, borderColor, borderStyle }
}
