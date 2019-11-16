import transformCss from '..'

it('transforms border none', () => {
  expect(transformCss([['border-right', 'none']])).toEqual({
    borderRightWidth: 0,
    borderRightColor: 'black',
  })
})

it('transforms border shorthand in other order', () => {
  expect(transformCss([['border-right', '#f00 2px']])).toEqual({
    borderRightWidth: 2,
    borderRightColor: '#f00',
  })
})

it('transforms border shorthand missing width', () => {
  expect(transformCss([['border-right', '#f00']])).toEqual({
    borderRightWidth: 1,
    borderRightColor: '#f00',
  })
})

it('transforms border shorthand missing color', () => {
  expect(transformCss([['border-right', '2px']])).toEqual({
    borderRightWidth: 2,
    borderRightColor: 'black',
  })
})

it('transforms border for unsupported units', () => {
  expect(transformCss([['border-right', '3em black']])).toEqual({
    borderRightWidth: '3em',
    borderRightColor: 'black',
  })
})

it('does not transform border with percentage width', () => {
  expect(() => transformCss([['border-right', '3% black']])).toThrow()
})

it('does not transform style', () => {
  expect(() => transformCss([['border-right', '2px dashed #f00']])).toThrow()
  expect(() => transformCss([['border-right', 'dashed #f00']])).toThrow()
  expect(() => transformCss([['border-right', '2px dashed']])).toThrow()
  expect(() => transformCss([['border-right', 'dashed']])).toThrow()
})
