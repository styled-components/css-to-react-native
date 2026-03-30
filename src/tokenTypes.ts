import cssColorKeywords from 'css-color-keywords'
import type { Node } from 'postcss-value-parser'
import { stringify } from 'postcss-value-parser'

import type { TokenDescriptor } from './TokenStream'

const matchString: TokenDescriptor = (node: Node) => {
  if (node.type !== 'string') return null
  return node.value
    .replace(/\\([0-9a-f]{1,6})(?:\s|$)/gi, (_match, charCode: string) =>
      String.fromCharCode(parseInt(charCode, 16))
    )
    .replace(/\\/g, '')
}

const hexColorRe = /^(#(?:[0-9a-f]{3,4}){1,2})$/i
const cssFunctionNameRe = /^(rgba?|hsla?|hwb|lab|lch|gray|color)$/

const matchColor: TokenDescriptor = (node: Node) => {
  if (
    node.type === 'word' &&
    (hexColorRe.test(node.value) ||
      node.value in cssColorKeywords ||
      node.value === 'transparent')
  ) {
    return node.value
  } else if (node.type === 'function' && cssFunctionNameRe.test(node.value)) {
    return stringify(node)
  }
  return null
}

const noneRe = /^(none)$/i
const autoRe = /^(auto)$/i
const identRe = /(^-?[_a-z][_a-z0-9-]*$)/i
// Note if these are wrong, you'll need to change index.js too
const numberRe = /^([+-]?(?:\d*\.)?\d+(?:e[+-]?\d+)?)$/i
// Note lengthRe is sneaky: you can omit units for 0
const lengthRe = /^(0$|(?:[+-]?(?:\d*\.)?\d+(?:e[+-]?\d+)?)(?=px$))/i
const unsupportedUnitRe =
  /^([+-]?(?:\d*\.)?\d+(?:e[+-]?\d+)?(ch|em|ex|rem|vh|vw|vmin|vmax|cm|mm|in|pc|pt))$/i
const angleRe = /^([+-]?(?:\d*\.)?\d+(?:e[+-]?\d+)?(?:deg|rad|grad|turn))$/i
const percentRe = /^([+-]?(?:\d*\.)?\d+(?:e[+-]?\d+)?%)$/i

const noopToken =
  (predicate: (node: Node) => boolean): TokenDescriptor =>
  (node: Node) =>
    predicate(node) ? '<token>' : null

const valueForTypeToken =
  (type: string): TokenDescriptor =>
  (node: Node) =>
    node.type === type ? node.value : null

export const regExpToken =
  (
    regExp: RegExp,
    transform: (value: string) => string | number = String
  ): TokenDescriptor =>
  (node: Node) => {
    if (node.type !== 'word') return null

    const match = node.value.match(regExp)
    if (match === null) return null

    const value = transform(match[1])

    return value
  }

export const SPACE: TokenDescriptor = noopToken((node) => node.type === 'space')
export const SLASH: TokenDescriptor = noopToken(
  (node) => node.type === 'div' && node.value === '/'
)
export const COMMA: TokenDescriptor = noopToken(
  (node) => node.type === 'div' && node.value === ','
)
export const WORD: TokenDescriptor = valueForTypeToken('word')
export const NONE: TokenDescriptor = regExpToken(noneRe)
export const AUTO: TokenDescriptor = regExpToken(autoRe)
export const NUMBER: TokenDescriptor = regExpToken(numberRe, Number)
export const LENGTH: TokenDescriptor = regExpToken(lengthRe, Number)
export const UNSUPPORTED_LENGTH_UNIT: TokenDescriptor =
  regExpToken(unsupportedUnitRe)
export const ANGLE: TokenDescriptor = regExpToken(angleRe, (angle) =>
  angle.toLowerCase()
)
export const PERCENT: TokenDescriptor = regExpToken(percentRe)
export const IDENT: TokenDescriptor = regExpToken(identRe)
export const STRING: TokenDescriptor = matchString
export const COLOR: TokenDescriptor = matchColor
export const LINE: TokenDescriptor = regExpToken(
  /^(none|underline|line-through)$/i
)
