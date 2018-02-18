import { regExpToken, tokens } from '../tokenTypes'
import boxShadow from './boxShadow'
import flex from './flex'
import font from './font'
import fontFamily from './fontFamily'
import textShadow from './textShadow'
import textDecoration from './textDecoration'
import textDecorationLine from './textDecorationLine'
import transform from './transform'
import { directionFactory, anyOrderFactory, shadowOffsetFactory } from './util'

const { IDENT, WORD, COLOR, LENGTH, PERCENT, AUTO } = tokens

const background = tokenStream => ({
  $merge: { backgroundColor: tokenStream.expect(COLOR) },
})
const border = anyOrderFactory({
  borderWidth: {
    token: tokens.LENGTH,
    default: 1,
  },
  borderColor: {
    token: COLOR,
    default: 'black',
  },
  borderStyle: {
    token: regExpToken(/^(solid|dashed|dotted)$/),
    default: 'solid',
  },
})
const borderColor = directionFactory({
  types: [WORD],
  prefix: 'border',
  suffix: 'Color',
})
const borderRadius = directionFactory({
  directions: ['TopLeft', 'TopRight', 'BottomRight', 'BottomLeft'],
  prefix: 'border',
  suffix: 'Radius',
})
const borderWidth = directionFactory({ prefix: 'border', suffix: 'Width' })
const margin = directionFactory({
  types: [LENGTH, PERCENT, AUTO],
  prefix: 'margin',
})
const padding = directionFactory({ prefix: 'padding' })
const flexFlow = anyOrderFactory({
  flexWrap: {
    token: regExpToken(/(nowrap|wrap|wrap-reverse)/),
    default: 'nowrap',
  },
  flexDirection: {
    token: regExpToken(/(row|row-reverse|column|column-reverse)/),
    default: 'row',
  },
})
const fontVariant = tokenStream => [tokenStream.expect(IDENT)]
const fontWeight = tokenStream => tokenStream.expect(WORD) // Also match numbers as strings
const shadowOffset = shadowOffsetFactory()
const textShadowOffset = shadowOffsetFactory()

export default {
  background,
  border,
  borderColor,
  borderRadius,
  borderWidth,
  boxShadow,
  flex,
  flexFlow,
  font,
  fontFamily,
  fontVariant,
  fontWeight,
  margin,
  padding,
  shadowOffset,
  textShadow,
  textShadowOffset,
  textDecoration,
  textDecorationLine,
  transform,
}
