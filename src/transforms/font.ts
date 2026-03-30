import type TokenStream from '../TokenStream'
import {
  LENGTH,
  regExpToken,
  SLASH,
  SPACE,
  UNSUPPORTED_LENGTH_UNIT,
} from '../tokenTypes'
import type { Style } from '../types'
import parseFontFamily from './fontFamily'

const NORMAL = regExpToken(/^(normal)$/)
const STYLE = regExpToken(/^(italic)$/)
const WEIGHT = regExpToken(/^([1-9]00|bold)$/)
const VARIANT = regExpToken(/^(small-caps)$/)

const defaultFontStyle = 'normal'
const defaultFontWeight = 'normal'
const defaultFontVariant: string[] = []

export default (tokenStream: TokenStream): Style => {
  let fontStyle: string | undefined
  let fontWeight: string | undefined
  let fontVariant: string[] | undefined
  // let fontSize;
  let lineHeight: string | number | undefined
  // let fontFamily;

  let numStyleWeightVariantMatched = 0
  while (numStyleWeightVariantMatched < 3 && tokenStream.hasTokens()) {
    if (tokenStream.matches(NORMAL)) {
      /* pass */
    } else if (fontStyle === undefined && tokenStream.matches(STYLE)) {
      fontStyle = String(tokenStream.lastValue)
    } else if (fontWeight === undefined && tokenStream.matches(WEIGHT)) {
      fontWeight = String(tokenStream.lastValue)
    } else if (fontVariant === undefined && tokenStream.matches(VARIANT)) {
      fontVariant = [String(tokenStream.lastValue)]
    } else {
      break
    }

    tokenStream.expect(SPACE)
    numStyleWeightVariantMatched += 1
  }

  const fontSize = tokenStream.expect(LENGTH, UNSUPPORTED_LENGTH_UNIT)

  if (tokenStream.matches(SLASH)) {
    lineHeight = tokenStream.expect(LENGTH, UNSUPPORTED_LENGTH_UNIT)
  }

  tokenStream.expect(SPACE)

  const { fontFamily } = parseFontFamily(tokenStream) as { fontFamily: string }

  if (fontStyle === undefined) fontStyle = defaultFontStyle
  if (fontWeight === undefined) fontWeight = defaultFontWeight
  if (fontVariant === undefined) fontVariant = defaultFontVariant

  const out: Style = {
    fontStyle,
    fontWeight,
    fontVariant,
    fontSize,
    fontFamily,
  }
  if (lineHeight !== undefined) out.lineHeight = lineHeight

  return out
}
