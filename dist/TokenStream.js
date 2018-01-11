'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SYMBOL_BASE_MATCH = 'SYMBOL_BASE_MATCH';
var SYMBOL_MATCH = 'SYMBOL_MATCH';

module.exports = function () {
  function TokenStream(nodes, parent, ignoreToken) {
    _classCallCheck(this, TokenStream);

    this.nodes = nodes;
    this.parent = parent;
    this.lastFunction = null;
    this.lastValue = null;
    this.ignoreToken = ignoreToken;
  }

  _createClass(TokenStream, [{
    key: 'hasTokens',
    value: function hasTokens() {
      return this.nodes.length > 0;
    }
  }, {
    key: 'lookAhead',
    value: function lookAhead() {
      return new TokenStream(this.nodes.slice(1), this.parent);
    }
  }, {
    key: SYMBOL_BASE_MATCH,
    value: function value() {
      var node = this.node;

      if (this.ignoreToken(node)) {
        return node.value;
      }

      if (!node) return null;

      for (var i = 0; i < arguments.length; i += 1) {
        var tokenDescriptor = arguments.length <= i ? undefined : arguments[i];
        var value = tokenDescriptor(node);
        if (value !== null) return value;
      }

      return null;
    }
  }, {
    key: SYMBOL_MATCH,
    value: function value() {
      var value = this[SYMBOL_BASE_MATCH].apply(this, arguments);
      if (value === null) return null;
      this.nodes = this.nodes.slice(1);
      this.lastFunction = null;
      this.lastValue = value;
      return value;
    }
  }, {
    key: 'test',
    value: function test() {
      return this[SYMBOL_BASE_MATCH].apply(this, arguments) !== null;
    }
  }, {
    key: 'matches',
    value: function matches() {
      return this[SYMBOL_MATCH].apply(this, arguments) !== null;
    }
  }, {
    key: 'expect',
    value: function expect() {
      var value = this[SYMBOL_MATCH].apply(this, arguments);

      if (value !== null) return value;
      return this.throw();
    }
  }, {
    key: 'matchesFunction',
    value: function matchesFunction() {
      var node = this.node;
      if (node.type !== 'function') return null;
      var value = new TokenStream(node.nodes, node);
      this.nodes = this.nodes.slice(1);
      this.lastFunction = value;
      this.lastValue = null;
      return value;
    }
  }, {
    key: 'expectFunction',
    value: function expectFunction() {
      var value = this.matchesFunction();
      if (value !== null) return value;
      return this.throw();
    }
  }, {
    key: 'expectEmpty',
    value: function expectEmpty() {
      if (this.hasTokens()) this.throw();
    }
  }, {
    key: 'throw',
    value: function _throw() {
      throw new Error('Unexpected token type: ' + this.node.type);
    }
  }, {
    key: 'node',
    get: function get() {
      return this.nodes[0];
    }
  }]);

  return TokenStream;
}();