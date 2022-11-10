import transformCss from '..'

it('transforms direction property', () => {
  expect(transformCss([['direction', 'ltr']])).toEqual({ direction: 'ltr' })
  expect(transformCss([['direction', 'rtl']])).toEqual({ direction: 'rtl' })
})

it('transforms start/end properties', () => {
  expect(transformCss([['start', '10px']])).toEqual({ start: 10 })
  expect(transformCss([['end', '20px']])).toEqual({ end: 20 })
})

it('transforms marginStart/End properties', () => {
  expect(transformCss([['margin-inline-start', '10px']])).toEqual({
    marginStart: 10,
  })
  expect(transformCss([['margin-inline-start', '10rem']])).toEqual({
    marginStart: '10rem',
  })
  expect(transformCss([['margin-inline-start', '10%']])).toEqual({
    marginStart: '10%',
  })
  expect(transformCss([['margin-inline-end', '20rem']])).toEqual({
    marginEnd: '20rem',
  })
  expect(transformCss([['margin-inline-end', '20%']])).toEqual({
    marginEnd: '20%',
  })
  expect(transformCss([['margin-inline-end', '20px']])).toEqual({
    marginEnd: 20,
  })
})

it('transforms paddingStart/End properties', () => {
  expect(transformCss([['padding-inline-start', '10px']])).toEqual({
    marginStart: 10,
  })
  expect(transformCss([['padding-inline-start', '10rem']])).toEqual({
    marginStart: '10rem',
  })
  expect(transformCss([['padding-inline-start', '10%']])).toEqual({
    marginStart: '10%',
  })
  expect(transformCss([['padding-inline-end', '20rem']])).toEqual({
    marginEnd: '20rem',
  })
  expect(transformCss([['padding-inline-end', '20%']])).toEqual({
    marginEnd: '20%',
  })
  expect(transformCss([['padding-inline-end', '20px']])).toEqual({
    marginEnd: 20,
  })
})

it('transforms borderWidthStart/End properties', () => {
  expect(transformCss([['border-inline-start-width', '10px']])).toEqual({
    borderStartWidth: 10,
  })

  expect(transformCss([['border-inline-end-width', '20px']])).toEqual({
    borderEndWidth: 20,
  })
})
