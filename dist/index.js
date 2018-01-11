'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable no-param-reassign */
var parse = require('postcss-value-parser');
var camelizeStyleName = require('fbjs/lib/camelizeStyleName');
var transforms = require('./transforms');
var TokenStream = require('./TokenStream');

// Note if this is wrong, you'll need to change tokenTypes.js too
var numberOrLengthRe = /^([+-]?(?:\d*\.)?\d+(?:[Ee][+-]?\d+)?)(?:px)?$/i;
var boolRe = /^true|false$/i;
var nullRe = /^null$/i;
var undefinedRe = /^undefined$/i;

// Undocumented export
var transformRawValue = exports.transformRawValue = function transformRawValue(input, ignoreToken) {
  var value = input.trim();

  if (ignoreToken(value)) {
    return value;
  }

  var numberMatch = value.match(numberOrLengthRe);
  if (numberMatch !== null) return Number(numberMatch[1]);

  var boolMatch = input.match(boolRe);
  if (boolMatch !== null) return boolMatch[0].toLowerCase() === 'true';

  var nullMatch = input.match(nullRe);
  if (nullMatch !== null) return null;

  var undefinedMatch = input.match(undefinedRe);
  if (undefinedMatch !== null) return undefined;

  return value;
};

var baseTransformShorthandValue = function baseTransformShorthandValue(propName, inputValue, ignoreToken) {
  var ast = parse(inputValue.trim());
  var tokenStream = new TokenStream(ast.nodes, null, ignoreToken);
  return transforms[propName](tokenStream);
};

var transformShorthandValue = process.env.NODE_ENV === 'production' ? baseTransformShorthandValue : function (propName, inputValue) {
  try {
    return baseTransformShorthandValue(propName, inputValue);
  } catch (e) {
    throw new Error('Failed to parse declaration "' + propName + ': ' + inputValue + '"');
  }
};

var getStylesForProperty = exports.getStylesForProperty = function getStylesForProperty(propName, inputValue, allowShorthand, ignoreToken) {
  var isRawValue = allowShorthand === false || !(propName in transforms);
  var propValue = isRawValue ? transformRawValue(inputValue, ignoreToken) : transformShorthandValue(propName, inputValue.trim(), ignoreToken);

  return propValue && propValue.$merge ? propValue.$merge : _defineProperty({}, propName, propValue);
};

var getPropertyName = exports.getPropertyName = camelizeStyleName;

exports.default = function (rules) {
  var shorthandBlacklist = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var ignoreToken = arguments[2];
  return rules.reduce(function (accum, rule) {
    var propertyName = getPropertyName(rule[0]);
    var value = rule[1];
    var allowShorthand = shorthandBlacklist.indexOf(propertyName) === -1;
    return Object.assign(accum, getStylesForProperty(propertyName, value, allowShorthand, ignoreToken));
  }, {});
};