const { tokens } = require('../tokenTypes')

const { SPACE, LINE } = tokens

module.exports = tokenStream => {
  const lines = []

  let didParseFirst = false
  while (tokenStream.hasTokens()) {
    if (didParseFirst) tokenStream.expect(SPACE)

    lines.push(tokenStream.expect(LINE))

    didParseFirst = true
  }

  lines.sort().reverse()

  return lines.join(' ')
}
