const { parseShadow } = require('./util')

module.exports = tokenStream => {
  const { offset, radius, color } = parseShadow(tokenStream)
  return {
    $merge: {
      textShadowOffset: offset,
      textShadowRadius: radius,
      textShadowColor: color,
    },
  }
}
