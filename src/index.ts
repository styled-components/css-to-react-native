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

  if (!isRawValue) return transformShorthandValue(propName, value)

  const propValues: Style = {}
  propValues[propName] = transformRawValue(propName, value)
  return propValues
}

// Known stylesheet names. Other names are camelized and not retained.
const knownPropertyNames: { [name: string]: string } = Object.create(null)

for (const name of [
  'align-content',
  'align-items',
  'align-self',
  'aspect-ratio',
  'backface-visibility',
  'background',
  'background-color',
  'border',
  'border-bottom-color',
  'border-bottom-end-radius',
  'border-bottom-left-radius',
  'border-bottom-right-radius',
  'border-bottom-start-radius',
  'border-bottom-width',
  'border-color',
  'border-curve',
  'border-end-color',
  'border-end-end-radius',
  'border-end-start-radius',
  'border-end-width',
  'border-left-color',
  'border-left-width',
  'border-radius',
  'border-right-color',
  'border-right-width',
  'border-start-color',
  'border-start-end-radius',
  'border-start-start-radius',
  'border-start-width',
  'border-style',
  'border-top-color',
  'border-top-end-radius',
  'border-top-left-radius',
  'border-top-right-radius',
  'border-top-start-radius',
  'border-top-width',
  'border-width',
  'bottom',
  'box-shadow',
  'color',
  'column-gap',
  'direction',
  'display',
  'elevation',
  'end',
  'filter',
  'flex',
  'flex-basis',
  'flex-direction',
  'flex-flow',
  'flex-grow',
  'flex-shrink',
  'flex-wrap',
  'font',
  'font-family',
  'font-size',
  'font-style',
  'font-variant',
  'font-weight',
  'gap',
  'height',
  'include-font-padding',
  'inset',
  'inset-block',
  'inset-block-end',
  'inset-block-start',
  'inset-inline',
  'inset-inline-end',
  'inset-inline-start',
  'justify-content',
  'left',
  'letter-spacing',
  'line-height',
  'margin',
  'margin-block',
  'margin-block-end',
  'margin-block-start',
  'margin-bottom',
  'margin-end',
  'margin-horizontal',
  'margin-inline',
  'margin-inline-end',
  'margin-inline-start',
  'margin-left',
  'margin-right',
  'margin-start',
  'margin-top',
  'margin-vertical',
  'max-height',
  'max-width',
  'min-height',
  'min-width',
  'mix-blend-mode',
  'object-fit',
  'opacity',
  'overflow',
  'overlay-color',
  'padding',
  'padding-block',
  'padding-block-end',
  'padding-block-start',
  'padding-bottom',
  'padding-end',
  'padding-horizontal',
  'padding-inline',
  'padding-inline-end',
  'padding-inline-start',
  'padding-left',
  'padding-right',
  'padding-start',
  'padding-top',
  'padding-vertical',
  'place-content',
  'pointer-events',
  'position',
  'resize-mode',
  'right',
  'row-gap',
  'shadow-color',
  'shadow-offset',
  'shadow-opacity',
  'shadow-radius',
  'start',
  'text-align',
  'text-align-vertical',
  'text-decoration',
  'text-decoration-color',
  'text-decoration-line',
  'text-decoration-style',
  'text-shadow',
  'text-shadow-color',
  'text-shadow-offset',
  'text-shadow-radius',
  'text-transform',
  'tint-color',
  'top',
  'transform',
  'transform-origin',
  'user-select',
  'vertical-align',
  'width',
  'writing-direction',
  'z-index',
]) {
  knownPropertyNames[name] = camelizeStyleName(name)
}

export const getPropertyName = (propName: string): string => {
  const cached = knownPropertyNames[propName]
  if (cached !== undefined) return cached

  const isCustomProp = /^--\w+/.test(propName)
  return isCustomProp ? propName : camelizeStyleName(propName)
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
