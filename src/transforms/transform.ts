import type TokenStream from '../TokenStream'
import type { TokenDescriptor } from '../TokenStream'
import { ANGLE, COMMA, LENGTH, NUMBER, PERCENT, SPACE } from '../tokenTypes'
import type { Style, TransformStyleValue } from '../types'

type TransformPartValue = string | number | TransformStyleValue[]

const oneOfTypes =
  (tokenTypes: TokenDescriptor[]) =>
  (functionStream: TokenStream): string | number => {
    const value = functionStream.expect(...tokenTypes)
    functionStream.expectEmpty()
    return value
  }

const singleNumber = oneOfTypes([NUMBER])
const singleLengthOrPercent = oneOfTypes([LENGTH, PERCENT])
const singleAngle = oneOfTypes([ANGLE])
const xyTransformFactory =
  (tokenTypes: TokenDescriptor[]) =>
  (key: string, valueIfOmitted?: string | number) =>
  (functionStream: TokenStream): TransformPartValue => {
    const x = functionStream.expect(...tokenTypes)

    let y: string | number | undefined
    if (functionStream.hasTokens()) {
      functionStream.expect(COMMA)
      y = functionStream.expect(...tokenTypes)
    } else if (valueIfOmitted !== undefined) {
      y = valueIfOmitted
    } else {
      // Assumption, if x === y, then we can omit XY
      // I.e. scale(5) => [{ scale: 5 }] rather than [{ scaleX: 5 }, { scaleY: 5 }]
      return x
    }

    functionStream.expectEmpty()

    return [{ [`${key}Y`]: y }, { [`${key}X`]: x }]
  }
const xyNumber = xyTransformFactory([NUMBER])
const xyLengthOrPercent = xyTransformFactory([LENGTH, PERCENT])
const xyAngle = xyTransformFactory([ANGLE])

const partTransforms: Record<
  string,
  (functionStream: TokenStream) => TransformPartValue
> = {
  perspective: singleNumber,
  scale: xyNumber('scale'),
  scaleX: singleNumber,
  scaleY: singleNumber,
  translate: xyLengthOrPercent('translate', 0),
  translateX: singleLengthOrPercent,
  translateY: singleLengthOrPercent,
  rotate: singleAngle,
  rotateX: singleAngle,
  rotateY: singleAngle,
  rotateZ: singleAngle,
  skewX: singleAngle,
  skewY: singleAngle,
  skew: xyAngle('skew', '0deg'),
}

export default (tokenStream: TokenStream): Style => {
  let transforms: TransformStyleValue[] = []

  let didParseFirst = false
  while (tokenStream.hasTokens()) {
    if (didParseFirst) tokenStream.expect(SPACE)

    const functionStream = tokenStream.expectFunction()
    const functionName = functionStream.functionName as string
    const partTransform = partTransforms[functionName]
    if (partTransform === undefined) {
      tokenStream.throw()
    }

    let transformedValues = partTransform(functionStream)
    if (!Array.isArray(transformedValues)) {
      transformedValues = [{ [functionName]: transformedValues }]
    }
    transforms = transformedValues.concat(transforms)

    didParseFirst = true
  }

  return { transform: transforms }
}
