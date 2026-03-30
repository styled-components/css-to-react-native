import camelizeStyleName from 'camelize'
import parse from 'postcss-value-parser'
import devPropertiesWithoutUnitsRegExp from './devPropertiesWithoutUnitsRegExp'
import TokenStream from './TokenStream'
import transforms from './transforms/index'
import type { Style, StylePrimitive, StyleTuple } from './types'

export type {
  ParsedShadow,
  ShadowOffset,
  Style,
  StylePrimitive,
  StyleTuple,
  StyleValue,
  TransformStyleValue,
} from './types'

// Note if this is wrong, you'll need to change tokenTypes.js too
const numberOrLengthRe = /^([+-]?(?:\d*\.)?\d+(?:e[+-]?\d+)?)(?:px)?$/i
const numberOnlyRe = /^[+-]?(?:\d*\.\d*|[1-9]\d*)(?:e[+-]?\d+)?$/i
const boolRe = /^true|false$/i
const nullRe = /^null$/i
const undefinedRe = /^undefined$/i

// Undocumented export
export const transformRawValue = (
  propName: string,
  value: string
): StylePrimitive => {
  if (process.env.NODE_ENV !== 'production') {
    const needsUnit = !devPropertiesWithoutUnitsRegExp?.test(propName)
    const isNumberWithoutUnit = numberOnlyRe.test(value)
    if (needsUnit && isNumberWithoutUnit) {
      // biome-ignore lint/suspicious/noConsole: Intentional warning
      console.warn(`Expected style "${propName}: ${value}" to contain units`)
    }
    if (!needsUnit && value !== '0' && !isNumberWithoutUnit) {
      // biome-ignore lint/suspicious/noConsole: Intentional warning
      console.warn(`Expected style "${propName}: ${value}" to be unitless`)
    }
  }

  const numberMatch = value.match(numberOrLengthRe)
  if (numberMatch !== null) return Number(numberMatch[1])

  const boolMatch = value.match(boolRe)
  if (boolMatch !== null) return boolMatch[0].toLowerCase() === 'true'

  const nullMatch = value.match(nullRe)
  if (nullMatch !== null) return null

  const undefinedMatch = value.match(undefinedRe)
  if (undefinedMatch !== null) return undefined

  return value
}

const baseTransformShorthandValue = (
  propName: string,
  value: string
): Style => {
  const ast = parse(value)
  const tokenStream = new TokenStream(ast.nodes)
  const transform = transforms[propName]
  if (transform === undefined) {
    throw new Error(`No transform registered for "${propName}"`)
  }
  return transform(tokenStream)
}

const transformShorthandValue =
  process.env.NODE_ENV === 'production'
    ? baseTransformShorthandValue
    : (propName: string, value: string): Style => {
        try {
          return baseTransformShorthandValue(propName, value)
        } catch (_e) {
          throw new Error(`Failed to parse declaration "${propName}: ${value}"`)
        }
      }

export const getStylesForProperty = (
  propName: string,
  inputValue: string,
  allowShorthand = true
): Style => {
  const isRawValue = allowShorthand === false || !(propName in transforms)
  const value = inputValue.trim()

  const propValues = isRawValue
    ? { [propName]: transformRawValue(propName, value) }
    : transformShorthandValue(propName, value)

  return propValues
}

export const getPropertyName = (propName: string): string => {
  const isCustomProp = /^--\w+/.test(propName)
  if (isCustomProp) {
    return propName
  }
  return camelizeStyleName(propName)
}

const transform = (
  rules: StyleTuple[],
  shorthandBlacklist: string[] = []
): Style => {
  const result: Style = {}

  for (const rule of rules) {
    const propertyName = getPropertyName(rule[0])
    const value = rule[1]
    const allowShorthand = shorthandBlacklist.indexOf(propertyName) === -1
    Object.assign(
      result,
      getStylesForProperty(propertyName, value, allowShorthand)
    )
  }

  return result
}

export default transform
