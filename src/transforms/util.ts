import type TokenStream from '../TokenStream'
import type { TokenDescriptor } from '../TokenStream'
import {
  COLOR,
  LENGTH,
  NONE,
  PERCENT,
  SPACE,
  UNSUPPORTED_LENGTH_UNIT,
} from '../tokenTypes'
import type { ParsedShadow, ShadowOffset, Style } from '../types'

export const directionFactory = ({
  types = [LENGTH, UNSUPPORTED_LENGTH_UNIT, PERCENT],
  directions = ['Top', 'Right', 'Bottom', 'Left'],
  prefix = '',
  suffix = '',
}: {
  types?: TokenDescriptor[]
  directions?: string[]
  prefix?: string
  suffix?: string
}) => {
  // Stable keys. Building a new string per value makes the result object slow.
  const key0 = `${prefix}${directions[0]}${suffix}`
  const key1 = `${prefix}${directions[1]}${suffix}`
  const key2 = `${prefix}${directions[2]}${suffix}`
  const key3 = `${prefix}${directions[3]}${suffix}`

  return (tokenStream: TokenStream): Style => {
    const values: Array<string | number> = []

    // borderWidth doesn't currently allow a percent value, but may do in the future
    values.push(tokenStream.expect(...types))

    while (values.length < 4 && tokenStream.hasTokens()) {
      tokenStream.expect(SPACE)
      values.push(tokenStream.expect(...types))
    }

    tokenStream.expectEmpty()

    const [top, right = top, bottom = top, left = right] = values

    const style: Style = {}
    style[key0] = top
    style[key1] = right
    style[key2] = bottom
    style[key3] = left
    return style
  }
}

export const parseShadowOffset = (tokenStream: TokenStream): ShadowOffset => {
  const width = tokenStream.expect(LENGTH)
  const height = tokenStream.matches(SPACE) ? tokenStream.expect(LENGTH) : width
  tokenStream.expectEmpty()
  return { width, height }
}

export const parseShadow = (tokenStream: TokenStream): ParsedShadow => {
  let offsetX: string | number | undefined
  let offsetY: string | number | undefined
  let radius: string | number | undefined
  let color: string | undefined

  if (tokenStream.matches(NONE)) {
    tokenStream.expectEmpty()
    return {
      offset: { width: 0, height: 0 },
      radius: 0,
      color: 'black',
    }
  }

  let didParseFirst = false
  while (tokenStream.hasTokens()) {
    if (didParseFirst) tokenStream.expect(SPACE)

    if (
      offsetX === undefined &&
      tokenStream.matches(LENGTH, UNSUPPORTED_LENGTH_UNIT)
    ) {
      offsetX = tokenStream.lastValue ?? undefined
      tokenStream.expect(SPACE)
      offsetY = tokenStream.expect(LENGTH, UNSUPPORTED_LENGTH_UNIT)

      tokenStream.saveRewindPoint()
      if (
        tokenStream.matches(SPACE) &&
        tokenStream.matches(LENGTH, UNSUPPORTED_LENGTH_UNIT)
      ) {
        radius = tokenStream.lastValue ?? undefined
      } else {
        tokenStream.rewind()
      }
    } else if (color === undefined && tokenStream.matches(COLOR)) {
      color = String(tokenStream.lastValue)
    } else {
      tokenStream.throw()
    }

    didParseFirst = true
  }

  if (offsetX === undefined) tokenStream.throw()

  return {
    offset: { width: offsetX, height: offsetY ?? offsetX },
    radius: radius !== undefined ? radius : 0,
    color: color !== undefined ? color : 'black',
  }
}
