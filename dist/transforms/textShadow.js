'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('./util');

exports.default = function (tokenStream) {
  var _parseShadow = (0, _util.parseShadow)(tokenStream),
      offset = _parseShadow.offset,
      radius = _parseShadow.radius,
      color = _parseShadow.color;

  return {
    $merge: {
      textShadowOffset: offset,
      textShadowRadius: radius,
      textShadowColor: color
    }
  };
};