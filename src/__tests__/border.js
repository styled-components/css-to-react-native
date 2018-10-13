import transformCss from '..'

it('transforms border shorthand', () => {
  expect(transformCss([['border', '2px dashed #f00']])).toEqual({
    borderWidth: 2,
    borderColor: '#f00',
    borderStyle: 'dashed',
  })
})

it('transforms border shorthand in other order', () => {
  expect(transformCss([['border', '#f00 2px dashed']])).toEqual({
    borderWidth: 2,
    borderColor: '#f00',
    borderStyle: 'dashed',
  })
})

it('transforms border shorthand missing color', () => {
  expect(transformCss([['border', '2px dashed']])).toEqual({
    borderWidth: 2,
    borderColor: 'black',
    borderStyle: 'dashed',
  })
})

it('transforms border shorthand missing style', () => {
  expect(transformCss([['border', '2px #f00']])).toEqual({
    borderWidth: 2,
    borderColor: '#f00',
    borderStyle: 'solid',
  })
})

it('transforms border shorthand missing width', () => {
  expect(transformCss([['border', '#f00 dashed']])).toEqual({
    borderWidth: 1,
    borderColor: '#f00',
    borderStyle: 'dashed',
  })
})

it('transforms border shorthand missing color & width', () => {
  expect(transformCss([['border', 'dashed']])).toEqual({
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'dashed',
  })
})

it('transforms border shorthand missing style & width', () => {
  expect(transformCss([['border', '#f00']])).toEqual({
    borderWidth: 1,
    borderColor: '#f00',
    borderStyle: 'solid',
  })
})

it('transforms border shorthand missing color & style', () => {
  expect(transformCss([['border', '2px']])).toEqual({
    borderWidth: 2,
    borderColor: 'black',
    borderStyle: 'solid',
  })
})

it('transforms bottom direction border shorthand', () => {
  expect(transformCss([['border-bottom', '2px dashed #f00']])).toEqual({
    borderBottomWidth: 2,
    borderBottomColor: '#f00',
    borderBottomStyle: 'dashed',
  })
})

it('transforms left direction border shorthand', () => {
  expect(transformCss([['border-left', '2px dashed #f00']])).toEqual({
    borderLeftWidth: 2,
    borderLeftColor: '#f00',
    borderLeftStyle: 'dashed',
  })
})

it('transforms right direction border shorthand', () => {
  expect(transformCss([['border-right', '2px dashed #f00']])).toEqual({
    borderRightWidth: 2,
    borderRightColor: '#f00',
    borderRightStyle: 'dashed',
  })
})

it('transforms top direction border shorthand', () => {
  expect(transformCss([['border-top', '2px dashed #f00']])).toEqual({
    borderTopWidth: 2,
    borderTopColor: '#f00',
    borderTopStyle: 'dashed',
  })
})
