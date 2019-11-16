import {
  regExpToken,
  NONE,
  COLOR,
  LENGTH,
  UNSUPPORTED_LENGTH_UNIT,
  SPACE,
} from '../tokenTypes'

const BORDER_STYLE = regExpToken(/^(solid|dashed|dotted)$/)

const defaultBorderWidth = 1
const defaultBorderColor = 'black'

export default tokenStream => {
  let borderWidth
  let borderColor
  let borderStyle

  if (tokenStream.matches(NONE)) {
    tokenStream.expectEmpty()
    return {
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      borderLeftWidth: 0,
      borderTopColor: 'black',
      borderRightColor: 'black',
      borderBottomColor: 'black',
      borderLeftColor: 'black',
      borderStyle: 'solid',
    }
  }

  let partsParsed = 0
  while (partsParsed < 3 && tokenStream.hasTokens()) {
    if (partsParsed !== 0) tokenStream.expect(SPACE)

    if (
      borderWidth === undefined &&
      tokenStream.matches(LENGTH, UNSUPPORTED_LENGTH_UNIT)
    ) {
      borderWidth = tokenStream.lastValue
    } else if (borderColor === undefined && tokenStream.matches(COLOR)) {
      borderColor = tokenStream.lastValue
    } else if (borderStyle === undefined && tokenStream.matches(BORDER_STYLE)) {
      borderStyle = tokenStream.lastValue
    } else {
      tokenStream.throw()
    }

    partsParsed += 1
  }

  tokenStream.expectEmpty()

  if (borderWidth === undefined) borderWidth = defaultBorderWidth
  if (borderColor === undefined) borderColor = defaultBorderColor
  if (borderStyle === undefined) {
    throw new Error(
      'You must define a border style in the border shorthand (e.g. solid)'
    )
  }

  return {
    borderTopWidth: borderWidth,
    borderRightWidth: borderWidth,
    borderBottomWidth: borderWidth,
    borderLeftWidth: borderWidth,
    borderTopColor: borderColor,
    borderRightColor: borderColor,
    borderBottomColor: borderColor,
    borderLeftColor: borderColor,
    borderStyle,
  }
}
