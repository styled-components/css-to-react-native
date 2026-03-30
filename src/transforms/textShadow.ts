import type TokenStream from '../TokenStream'
import type { Style } from '../types'
import { parseShadow } from './util'

export default (tokenStream: TokenStream): Style => {
  const { offset, radius, color } = parseShadow(tokenStream)
  return {
    textShadowOffset: offset,
    textShadowRadius: radius,
    textShadowColor: color,
  }
}
