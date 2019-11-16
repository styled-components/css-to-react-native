import transformCss from '..'

it('transforms border none', () => {
  expect(transformCss([['border', 'none']])).toEqual({
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderTopColor: 'black',
    borderRightColor: 'black',
    borderBottomColor: 'black',
    borderLeftColor: 'black',
    borderStyle: 'solid',
  })
})

it('transforms border shorthand', () => {
  expect(transformCss([['border', '2px dashed #f00']])).toEqual({
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderTopColor: '#f00',
    borderRightColor: '#f00',
    borderBottomColor: '#f00',
    borderLeftColor: '#f00',
    borderStyle: 'dashed',
  })
})

it('transforms border shorthand in other order', () => {
  expect(transformCss([['border', '#f00 2px dashed']])).toEqual({
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderTopColor: '#f00',
    borderRightColor: '#f00',
    borderBottomColor: '#f00',
    borderLeftColor: '#f00',
    borderStyle: 'dashed',
  })
})

it('transforms border shorthand missing color', () => {
  expect(transformCss([['border', '2px dashed']])).toEqual({
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderTopColor: 'black',
    borderRightColor: 'black',
    borderBottomColor: 'black',
    borderLeftColor: 'black',
    borderStyle: 'dashed',
  })
})

it('transforms border shorthand missing style', () => {
  expect(transformCss([['border', '2px #f00']])).toEqual({
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderTopColor: '#f00',
    borderRightColor: '#f00',
    borderBottomColor: '#f00',
    borderLeftColor: '#f00',
    borderStyle: 'solid',
  })
})

it('transforms border shorthand missing width', () => {
  expect(transformCss([['border', '#f00 dashed']])).toEqual({
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderTopColor: '#f00',
    borderRightColor: '#f00',
    borderBottomColor: '#f00',
    borderLeftColor: '#f00',
    borderStyle: 'dashed',
  })
})

it('transforms border shorthand missing color & width', () => {
  expect(transformCss([['border', 'dashed']])).toEqual({
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderTopColor: 'black',
    borderRightColor: 'black',
    borderBottomColor: 'black',
    borderLeftColor: 'black',
    borderStyle: 'dashed',
  })
})

it('transforms border shorthand missing style & width', () => {
  expect(transformCss([['border', '#f00']])).toEqual({
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderTopColor: '#f00',
    borderRightColor: '#f00',
    borderBottomColor: '#f00',
    borderLeftColor: '#f00',
    borderStyle: 'solid',
  })
})

it('transforms border shorthand missing color & style', () => {
  expect(transformCss([['border', '2px']])).toEqual({
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderTopColor: 'black',
    borderRightColor: 'black',
    borderBottomColor: 'black',
    borderLeftColor: 'black',
    borderStyle: 'solid',
  })
})

it('transforms border for unsupported units', () => {
  expect(transformCss([['border', '3em solid black']])).toEqual({
    borderTopWidth: '3em',
    borderRightWidth: '3em',
    borderBottomWidth: '3em',
    borderLeftWidth: '3em',
    borderTopColor: 'black',
    borderRightColor: 'black',
    borderBottomColor: 'black',
    borderLeftColor: 'black',
    borderStyle: 'solid',
  })
})

it('does not transform border with percentage width', () => {
  expect(() => transformCss([['border', '3% solid black']])).toThrow()
})
