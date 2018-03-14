'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SYMBOL_MATCH = 'SYMBOL_MATCH';

var TokenStream = function () {
  function TokenStream(nodes, parent, ignoreToken) {
    _classCallCheck(this, TokenStream);

    this.index = 0;
    this.nodes = nodes;
    this.functionName = parent != null ? parent.value : null;
    this.lastValue = null;
    this.rewindIndex = -1;
    this.ignoreToken = ignoreToken;
  }

  _createClass(TokenStream, [{
    key: 'hasTokens',
    value: function hasTokens() {
      return this.index <= this.nodes.length - 1;
    }
  }, {
    key: SYMBOL_MATCH,
    value: function value() {
      if (!this.hasTokens()) return null;

      var node = this.nodes[this.index];
      if (this.ignoreToken(node)) {
        return node.value;
      }

      for (var i = 0; i < arguments.length; i += 1) {
        var tokenDescriptor = arguments.length <= i ? undefined : arguments[i];
        var value = tokenDescriptor(node);
        if (value !== null) {
          this.index += 1;
          this.lastValue = value;
          return value;
        }
      }

      return null;
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
      return value !== null ? value : this.throw();
    }
  }, {
    key: 'matchesFunction',
    value: function matchesFunction() {
      var node = this.nodes[this.index];
      if (node.type !== 'function') return null;
      var value = new TokenStream(node.nodes, node, this.ignoreToken);
      this.index += 1;
      this.lastValue = null;
      return value;
    }
  }, {
    key: 'expectFunction',
    value: function expectFunction() {
      var value = this.matchesFunction();
      return value !== null ? value : this.throw();
    }
  }, {
    key: 'expectEmpty',
    value: function expectEmpty() {
      if (this.hasTokens()) this.throw();
    }
  }, {
    key: 'throw',
    value: function _throw() {
      throw new Error('Unexpected token type: ' + this.nodes[this.index].type);
    }
  }, {
    key: 'saveRewindPoint',
    value: function saveRewindPoint() {
      this.rewindIndex = this.index;
    }
  }, {
    key: 'rewind',
    value: function rewind() {
      if (this.rewindIndex === -1) throw new Error('Internal error');
      this.index = this.rewindIndex;
      this.lastValue = null;
    }
  }]);

  return TokenStream;
}();

exports.default = TokenStream;