import transformCss from '..'

it('transforms line-height with value and unit', () => {
  expect(transformCss([['line-height', '1.5px']])).toEqual({
    lineHeight: 1.5,
  })
})

it('throws for line-height with multiplier', () => {
  expect(() => transformCss([['line-height', '1.5']])).toThrow(
    'Failed to parse declaration "lineHeight: 1.5"'
  )
})
