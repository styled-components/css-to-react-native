import transformCss from '..'

it('transition none', () => {
  expect(transformCss([['transition', 'none']])).toEqual({
    transitionProperty: [],
    transitionDuration: [],
    transitionTimingFunction: [],
    transitionDelay: [],
  })
})

it('transition a single property', () => {
  expect(transformCss([['transition', 'margin-left .3s']])).toEqual({
    transitionProperty: ['marginLeft'],
    transitionDuration: [300],
    transitionTimingFunction: ['ease'],
    transitionDelay: [0],
  })
})


it('transition-delay property', () => {
  expect(transformCss([['transition-delay', '1s, 300ms, 0.3s, .085s']])).toEqual({
    transitionDelay: [1000, 300, 300, 85],
  });
})


it('transition-property property', () => {
  expect(transformCss([['transition-property', 'margin-left, padding-top']])).toEqual({
    transitionProperty: ['marginLeft', 'paddingTop'],
  });
})
