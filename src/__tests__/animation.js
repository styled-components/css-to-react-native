import transformCss from '..'

const emptyAnimation = {
  animationName: [],
  animationDuration: [],
  animationTimingFunction: [],
  animationDelay: [],
  animationIterationCount: [],
  animationDirection: [],
  animationFillMode: [],
  animationPlayState: [],
}

it('animation none', () => {
  expect(transformCss([['animation', 'none']])).toEqual(emptyAnimation)
})

it('animation a single property', () => {
  expect(transformCss([['animation', 'slide-in linear .3s']])).toEqual({
    animationName: ['slide-in'],
    animationDuration: [300],
    animationTimingFunction: ['linear'],
    animationDelay: [0],
    animationIterationCount: [1],
    animationDirection: ['normal'],
    animationFillMode: ['none'],
    animationPlayState: ['running'],
  })
})


it('animation-name property', () => {
  expect(transformCss([['animation-name', 'slide-in']])).toEqual({
    animationName: ['slide-in'],
  });
})
