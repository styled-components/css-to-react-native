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
const defaultBorderStyle = 'solid'

const baseParse = (tokenStream, allowBorderStyle) => {
  let borderWidth
  let borderColor
  let borderStyle

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
    borderStyle = defaultBorderStyle
  } else if (!allowBorderStyle) {
    throw new Error(
      'Setting a border style on a single border side is not supported'
    )
  }

  return { borderWidth, borderColor, borderStyle }
}

export default tokenStream => {
  // eslint-disable-next-line prefer-const
  let { borderWidth, borderColor, borderStyle } = baseParse(tokenStream, true)

  if (borderStyle === undefined) borderStyle = defaultBorderStyle

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

export const borderTop = tokenStream => {
  const { borderWidth, borderColor } = baseParse(tokenStream, false)
  return { borderTopWidth: borderWidth, borderTopColor: borderColor }
}

export const borderRight = tokenStream => {
  const { borderWidth, borderColor } = baseParse(tokenStream, false)
  return { borderRightWidth: borderWidth, borderRightColor: borderColor }
}

export const borderBottom = tokenStream => {
  const { borderWidth, borderColor } = baseParse(tokenStream, false)
  return { borderBottomWidth: borderWidth, borderBottomColor: borderColor }
}

export const borderLeft = tokenStream => {
  const { borderWidth, borderColor } = baseParse(tokenStream, false)
  return { borderLeftWidth: borderWidth, borderLeftColor: borderColor }
}
