import { LENGTH, UNSUPPORTED_LENGTH_UNIT, PERCENT } from '../tokenTypes'

export const marginInlineStart = tokenStream => ({
  marginStart: tokenStream.expect(
    ...[LENGTH, UNSUPPORTED_LENGTH_UNIT, PERCENT]
  ),
})

export const marginInlineEnd = tokenStream => ({
  marginEnd: tokenStream.expect(...[LENGTH, UNSUPPORTED_LENGTH_UNIT, PERCENT]),
})

export const paddingInlineStart = tokenStream => ({
  marginStart: tokenStream.expect(
    ...[LENGTH, UNSUPPORTED_LENGTH_UNIT, PERCENT]
  ),
})

export const paddingInlineEnd = tokenStream => ({
  marginEnd: tokenStream.expect(...[LENGTH, UNSUPPORTED_LENGTH_UNIT, PERCENT]),
})

export const borderInlineStartWidth = tokenStream => ({
  borderStartWidth: tokenStream.expect(
    ...[LENGTH, UNSUPPORTED_LENGTH_UNIT, PERCENT]
  ),
})

export const borderInlineEndWidth = tokenStream => ({
  borderEndWidth: tokenStream.expect(
    ...[LENGTH, UNSUPPORTED_LENGTH_UNIT, PERCENT]
  ),
})
