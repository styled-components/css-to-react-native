'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../tokenTypes'),
    tokens = _require.tokens;

var SPACE = tokens.SPACE,
    COMMA = tokens.COMMA,
    LENGTH = tokens.LENGTH,
    NUMBER = tokens.NUMBER,
    ANGLE = tokens.ANGLE;


var oneOfType = function oneOfType(tokenType) {
  return function (functionStream) {
    var value = functionStream.expect(tokenType);
    functionStream.expectEmpty();
    return value;
  };
};

var singleNumber = oneOfType(NUMBER);
var singleLength = oneOfType(LENGTH);
var singleAngle = oneOfType(ANGLE);
var xyTransformFactory = function xyTransformFactory(tokenType) {
  return function (key, valueIfOmitted) {
    return function (functionStream) {
      var x = functionStream.expect(tokenType);

      var y = void 0;
      if (functionStream.hasTokens()) {
        functionStream.expect(COMMA);
        y = functionStream.expect(tokenType);
      } else if (valueIfOmitted !== undefined) {
        y = valueIfOmitted;
      } else {
        // Assumption, if x === y, then we can omit XY
        // I.e. scale(5) => [{ scale: 5 }] rather than [{ scaleX: 5 }, { scaleY: 5 }]
        return x;
      }

      functionStream.expectEmpty();

      return [_defineProperty({}, key + 'Y', y), _defineProperty({}, key + 'X', x)];
    };
  };
};
var xyNumber = xyTransformFactory(NUMBER);
var xyLength = xyTransformFactory(LENGTH);
var xyAngle = xyTransformFactory(ANGLE);

var partTransforms = {
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
  skew: xyAngle('skew', '0deg')
};

module.exports = function (tokenStream) {
  var transforms = [];

  var didParseFirst = false;
  while (tokenStream.hasTokens()) {
    if (didParseFirst) tokenStream.expect(SPACE);

    var functionStream = tokenStream.expectFunction();
    var transformName = functionStream.parent.value;
    var transformedValues = partTransforms[transformName](functionStream);
    if (!Array.isArray(transformedValues)) {
      transformedValues = [_defineProperty({}, transformName, transformedValues)];
    }
    transforms = transformedValues.concat(transforms);

    didParseFirst = true;
  }

  return transforms;
};