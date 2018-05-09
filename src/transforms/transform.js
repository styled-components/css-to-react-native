import { tokens } from '../tokenTypes'

const { SPACE, COMMA, LENGTH, PERCENT, NUMBER, ANGLE } = tokens

const oneOfType = (...tokenTypes) => functionStream => {
  const value = functionStream.expect(...tokenTypes)
  functionStream.expectEmpty()
  return value
}

const singleNumber = oneOfType(NUMBER)
const singleLength = oneOfType(LENGTH, PERCENT)
const singleAngle = oneOfType(ANGLE)
const xyTransformFactory = (...tokenTypes) => (
  key,
  valueIfOmitted
) => functionStream => {
  const x = functionStream.expect(...tokenTypes)

  let y
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
const xyNumber = xyTransformFactory(NUMBER)
const xyLength = xyTransformFactory(LENGTH, PERCENT)
const xyAngle = xyTransformFactory(ANGLE)

const partTransforms = {
  perspective: singleNumber,
  scale: xyNumber('scale'),
  scaleX: singleNumber,
  scaleY: singleNumber,
  translate: xyLength('translate', 0),
  translateX: singleLength,
  translateY: singleLength,
  rotate: singleAngle,
  rotateX: singleAngle,
  rotateY: singleAngle,
  rotateZ: singleAngle,
  skewX: singleAngle,
  skewY: singleAngle,
  skew: xyAngle('skew', '0deg'),
}

export default tokenStream => {
  let transforms = []

  let didParseFirst = false
  while (tokenStream.hasTokens()) {
    if (didParseFirst) tokenStream.expect(SPACE)

    const functionStream = tokenStream.expectFunction()
    const { functionName } = functionStream
    let transformedValues = partTransforms[functionName](functionStream)
    if (!Array.isArray(transformedValues)) {
      transformedValues = [{ [functionName]: transformedValues }]
    }
    transforms = transformedValues.concat(transforms)

    didParseFirst = true
  }

  return transforms
}
