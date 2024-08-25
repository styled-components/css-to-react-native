import transformCss from '..'

it('transforms hex colors', () => {
  expect(transformCss([['color', '#f00']])).toEqual({ color: '#f00' })
})

it('transforms rgb colors', () => {
  expect(transformCss([['color', 'rgb(255, 0, 0)']])).toEqual({
    color: 'rgb(255, 0, 0)',
  })
})

it('transforms transparent color', () => {
  expect(transformCss([['color', 'transparent']])).toEqual({
    color: 'transparent',
  })
})

it('transforms border shorthand with transparent color', () => {
  expect(transformCss([['border', '2px dashed transparent']])).toEqual({
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    borderStyle: 'dashed',
  })
})

it('transforms background shorthand with transparent color', () => {
  expect(transformCss([['background', 'transparent']])).toEqual({
    backgroundColor: 'transparent',
  })
})
