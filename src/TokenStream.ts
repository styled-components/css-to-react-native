import type { Node } from 'postcss-value-parser'

type TokenMatch = string | number
export type TokenDescriptor = (node: Node) => TokenMatch | null

export default class TokenStream {
  index: number
  nodes: Node[]
  functionName: string | null
  lastValue: TokenMatch | null
  rewindIndex: number

  constructor(nodes: Node[], parent?: Node) {
    this.index = 0
    this.nodes = nodes
    this.functionName = parent != null ? parent.value : null
    this.lastValue = null
    this.rewindIndex = -1
  }

  hasTokens(): boolean {
    return this.index <= this.nodes.length - 1
  }

  matchToken(...tokenDescriptors: TokenDescriptor[]): TokenMatch | null {
    if (!this.hasTokens()) return null

    const node = this.nodes[this.index]

    for (let i = 0; i < tokenDescriptors.length; i += 1) {
      const tokenDescriptor = tokenDescriptors[i]
      const value = tokenDescriptor(node)
      if (value !== null) {
        this.index += 1
        this.lastValue = value
        return value
      }
    }

    return null
  }

  matches(...tokenDescriptors: TokenDescriptor[]): boolean {
    return this.matchToken(...tokenDescriptors) !== null
  }

  expect(...tokenDescriptors: TokenDescriptor[]): TokenMatch {
    const value = this.matchToken(...tokenDescriptors)
    return value !== null ? value : this.throw()
  }

  matchesFunction(): TokenStream | null {
    const node = this.nodes[this.index]
    if (node.type !== 'function') return null
    const value = new TokenStream(node.nodes ?? [], node)
    this.index += 1
    this.lastValue = null
    return value
  }

  expectFunction(): TokenStream {
    const value = this.matchesFunction()
    return value !== null ? value : this.throw()
  }

  expectEmpty(): void {
    if (this.hasTokens()) this.throw()
  }

  throw(): never {
    throw new Error(`Unexpected token type: ${this.nodes[this.index].type}`)
  }

  saveRewindPoint(): void {
    this.rewindIndex = this.index
  }

  rewind(): void {
    if (this.rewindIndex === -1) throw new Error('Internal error')
    this.index = this.rewindIndex
    this.lastValue = null
  }
}
