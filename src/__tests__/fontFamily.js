import transformCss from '..'

it('transforms font-family with double quotes', () => {
  expect(transformCss([['font-family', '"Helvetica Neue"']])).toEqual({
    fontFamily: 'Helvetica Neue',
  })
})

it('transforms font-family with single quotes', () => {
  expect(transformCss([['font-family', "'Helvetica Neue'"]])).toEqual({
    fontFamily: 'Helvetica Neue',
  })
})

it('transforms font-family without quotes', () => {
  expect(transformCss([['font-family', 'Helvetica Neue']])).toEqual({
    fontFamily: 'Helvetica Neue',
  })
})

it('transforms font-family with quotes with otherwise invalid values', () => {
  expect(transformCss([['font-family', '"Goudy Bookletter 1911"']])).toEqual({
    fontFamily: 'Goudy Bookletter 1911',
  })
})

it('transforms font-family with quotes with escaped values', () => {
  expect(transformCss([['font-family', '"test\\A test"']])).toEqual({
    fontFamily: 'test\ntest',
  })
})

it('transforms font-family with quotes with escaped quote', () => {
  expect(transformCss([['font-family', '"test\\"test"']])).toEqual({
    fontFamily: 'test"test',
  })
})

it('does not transform invalid unquoted font-family', () => {
  expect(() =>
    transformCss([['font-family', 'Goudy Bookletter 1911']])
  ).toThrow()
})

it('transforms font-family with css variable', () => {
  expect(transformCss([['font-family', 'var(--test)']])).toEqual({
    fontFamily: 'var(--test)',
  })
})

it('transforms font-family with css variable and default value', () => {
  expect(transformCss([['font-family', 'var(--test, arial)']])).toEqual({
    fontFamily: 'var(--test, arial)',
  })
})

it('transforms font-family with css variable and default quoted value', () => {
  expect(transformCss([['font-family', 'var(--test, \'arial\')']])).toEqual({
    fontFamily: 'var(--test, \'arial\')',
  })
})

it('transforms font-family with css variable and two default values', () => {
  expect(transformCss([['font-family', 'var(--test, hello, world)']])).toEqual({
    fontFamily: 'var(--test, hello, world)',
  })
})

it('does not transform font-family with css variable and invalid default value', () => {
  expect(() =>
    transformCss([['font-family', 'var(--test,)']])
  ).toThrow()
})

it('does not transform font-family with multiple bad css variable default values', () => {
  expect(() =>
    transformCss([['font-family', 'var(--test,,)']])
  ).toThrow()
})