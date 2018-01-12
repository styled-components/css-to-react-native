const SYMBOL_BASE_MATCH = 'SYMBOL_BASE_MATCH';
const SYMBOL_MATCH = 'SYMBOL_MATCH';

module.exports = class TokenStream {
  constructor(nodes, parent, ignoreToken) {
    this.nodes = nodes;
    this.parent = parent;
    this.lastFunction = null;
    this.lastValue = null;
    this.ignoreToken = ignoreToken;
  }

  get node() {
    return this.nodes[0];
  }

  hasTokens() {
    return this.nodes.length > 0;
  }

  lookAhead() {
    return new TokenStream(this.nodes.slice(1), this.parent, this.ignoreToken);
  }

  [SYMBOL_BASE_MATCH](...tokenDescriptors) {
    const node = this.node;

    if (this.ignoreToken(node)) {
      return node.value;
    }

    if (!node) return null;

    for (let i = 0; i < tokenDescriptors.length; i += 1) {
      const tokenDescriptor = tokenDescriptors[i];
      const value = tokenDescriptor(node);
      if (value !== null) return value;
    }

    return null;
  }

  [SYMBOL_MATCH](...tokenDescriptors) {
    const value = this[SYMBOL_BASE_MATCH](...tokenDescriptors);
    if (value === null) return null;
    this.nodes = this.nodes.slice(1);
    this.lastFunction = null;
    this.lastValue = value;
    return value;
  }

  test(...tokenDescriptors) {
    return this[SYMBOL_BASE_MATCH](...tokenDescriptors) !== null;
  }

  matches(...tokenDescriptors) {
    return this[SYMBOL_MATCH](...tokenDescriptors) !== null;
  }

  expect(...tokenDescriptors) {
    const value = this[SYMBOL_MATCH](...tokenDescriptors);

    if (value !== null) return value;
    return this.throw();
  }

  matchesFunction() {
    const node = this.node;
    if (node.type !== 'function') return null;
    const value = new TokenStream(node.nodes, node, this.ignoreToken);
    this.nodes = this.nodes.slice(1);
    this.lastFunction = value;
    this.lastValue = null;
    return value;
  }

  expectFunction() {
    const value = this.matchesFunction();
    if (value !== null) return value;
    return this.throw();
  }

  expectEmpty() {
    if (this.hasTokens()) this.throw();
  }

  throw() {
    throw new Error(`Unexpected token type: ${this.node.type}`);
  }
};
