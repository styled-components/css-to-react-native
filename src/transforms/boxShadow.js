import { parseShadow } from './util'

export default tokenStream => {
  const { offset, radius, color, opacity } = parseShadow(tokenStream)
  return {
    $merge: {
      shadowOffset: offset,
      shadowRadius: radius,
      shadowColor: color,
      shadowOpacity: opacity,
    },
  }
}
