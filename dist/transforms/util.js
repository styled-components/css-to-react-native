'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _require = require('../tokenTypes'),
    tokens = _require.tokens;

var LENGTH = tokens.LENGTH,
    PERCENT = tokens.PERCENT,
    SPACE = tokens.SPACE;


module.exports.directionFactory = function (_ref) {
  var _ref$types = _ref.types,
      types = _ref$types === undefined ? [LENGTH, PERCENT] : _ref$types,
      _ref$directions = _ref.directions,
      directions = _ref$directions === undefined ? ['Top', 'Right', 'Bottom', 'Left'] : _ref$directions,
      _ref$prefix = _ref.prefix,
      prefix = _ref$prefix === undefined ? '' : _ref$prefix,
      _ref$suffix = _ref.suffix,
      suffix = _ref$suffix === undefined ? '' : _ref$suffix;
  return function (tokenStream) {
    var _output;

    var values = [];

    // borderWidth doesn't currently allow a percent value, but may do in the future
    values.push(tokenStream.expect.apply(tokenStream, _toConsumableArray(types)));

    while (values.length < 4 && tokenStream.hasTokens()) {
      tokenStream.expect(SPACE);
      values.push(tokenStream.expect.apply(tokenStream, _toConsumableArray(types)));
    }

    tokenStream.expectEmpty();

    var top = values[0],
        _values$ = values[1],
        right = _values$ === undefined ? top : _values$,
        _values$2 = values[2],
        bottom = _values$2 === undefined ? top : _values$2,
        _values$3 = values[3],
        left = _values$3 === undefined ? right : _values$3;


    var keyFor = function keyFor(n) {
      return '' + prefix + directions[n] + suffix;
    };

    var output = (_output = {}, _defineProperty(_output, keyFor(0), top), _defineProperty(_output, keyFor(1), right), _defineProperty(_output, keyFor(2), bottom), _defineProperty(_output, keyFor(3), left), _output);

    return { $merge: output };
  };
};

module.exports.anyOrderFactory = function (properties) {
  var delim = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : SPACE;
  return function (tokenStream) {
    var propertyNames = Object.keys(properties);
    var values = propertyNames.reduce(function (accum, propertyName) {
      accum[propertyName] === undefined; // eslint-disable-line
      return accum;
    }, {});

    var numParsed = 0;
    while (numParsed < propertyNames.length && tokenStream.hasTokens()) {
      if (numParsed) tokenStream.expect(delim);

      var matchedPropertyName = propertyNames.find(function (propertyName) {
        return values[propertyName] === undefined && tokenStream.matches(properties[propertyName].token);
      });

      if (!matchedPropertyName) {
        tokenStream.throw();
      } else {
        values[matchedPropertyName] = tokenStream.lastValue;
      }

      numParsed += 1;
    }

    tokenStream.expectEmpty();

    propertyNames.forEach(function (propertyName) {
      if (values[propertyName] === undefined) values[propertyName] = properties[propertyName].default;
    });

    return { $merge: values };
  };
};

module.exports.shadowOffsetFactory = function () {
  return function (tokenStream) {
    var width = tokenStream.expect(LENGTH);
    var height = tokenStream.matches(SPACE) ? tokenStream.expect(LENGTH) : width;
    tokenStream.expectEmpty();
    return { width: width, height: height };
  };
};