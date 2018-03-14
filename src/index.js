/* eslint-disable no-param-reassign */
import parse from 'postcss-value-parser'
import camelizeStyleName from 'fbjs/lib/camelizeStyleName'
import transforms from './transforms/index'
import TokenStream from './TokenStream'

// Note if this is wrong, you'll need to change tokenTypes.js too
const numberOrLengthRe = /^([+-]?(?:\d*\.)?\d+(?:[Ee][+-]?\d+)?)(?:px)?$/i
const boolRe = /^true|false$/i
const nullRe = /^null$/i
const undefinedRe = /^undefined$/i

// Undocumented export
export const transformRawValue = (input, ignoreToken) => {
  const value = input.trim()

  if (ignoreToken && ignoreToken(value)) {
    return value
  }

  const numberMatch = value.match(numberOrLengthRe)
  if (numberMatch !== null) return Number(numberMatch[1])

  const boolMatch = input.match(boolRe)
  if (boolMatch !== null) return boolMatch[0].toLowerCase() === 'true'

  const nullMatch = input.match(nullRe)
  if (nullMatch !== null) return null

  const undefinedMatch = input.match(undefinedRe)
  if (undefinedMatch !== null) return undefined

  return value
}

const baseTransformShorthandValue = (propName, inputValue, ignoreToken) => {
  const ast = parse(inputValue.trim())
  const tokenStream = new TokenStream(ast.nodes, null, ignoreToken)
  return transforms[propName](tokenStream)
}

const transformShorthandValue =
  process.env.NODE_ENV === 'production'
    ? baseTransformShorthandValue
    : (propName, inputValue, ignoreToken) => {
        try {
          return baseTransformShorthandValue(propName, inputValue, ignoreToken)
        } catch (e) {
          throw new Error(
            `Failed to parse declaration "${propName}: ${inputValue}"`
          )
        }
      }

export const getStylesForProperty = (
  propName,
  inputValue,
  allowShorthand,
  ignoreToken
) => {
  const isRawValue = allowShorthand === false || !(propName in transforms)
  const propValue = isRawValue
    ? transformRawValue(inputValue, ignoreToken)
    : transformShorthandValue(propName, inputValue.trim(), ignoreToken)

  return propValue && propValue.$merge
    ? propValue.$merge
    : { [propName]: propValue }
}

export const getPropertyName = camelizeStyleName

export default (rules, shorthandBlacklist = [], ignoreToken) =>
  rules.reduce((accum, rule) => {
    const propertyName = getPropertyName(rule[0])
    const value = rule[1]
    const allowShorthand = shorthandBlacklist.indexOf(propertyName) === -1
    return Object.assign(
      accum,
      getStylesForProperty(propertyName, value, allowShorthand, ignoreToken)
    )
  }, {})
