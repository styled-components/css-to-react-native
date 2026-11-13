import { expect, it } from 'vitest'

import transformCss from '..'

it('transforms flexFlow shorthand with two values', () => {
  expect(transformCss([['flex-flow', 'column wrap']])).toEqual({
    flexDirection: 'column',
    flexWrap: 'wrap',
  })
})

it('transforms flexFlow shorthand missing flexDirection', () => {
  expect(transformCss([['flex-flow', 'wrap']])).toEqual({
    flexDirection: 'row',
    flexWrap: 'wrap',
  })
})

it('transforms flexFlow shorthand missing flexWrap', () => {
  expect(transformCss([['flex-flow', 'column']])).toEqual({
    flexDirection: 'column',
    flexWrap: 'nowrap',
  })
})

it.each([
  ['column-reverse', 'column-reverse', 'nowrap'],
  ['row-reverse', 'row-reverse', 'nowrap'],
  ['wrap-reverse', 'row', 'wrap-reverse'],
  ['row-reverse wrap', 'row-reverse', 'wrap'],
  ['column-reverse wrap-reverse', 'column-reverse', 'wrap-reverse'],
  ['wrap-reverse column-reverse', 'column-reverse', 'wrap-reverse'],
])('transforms flex-flow: %s', (value, flexDirection, flexWrap) => {
  expect(transformCss([['flex-flow', value]])).toEqual({
    flexDirection,
    flexWrap,
  })
})

it.each(['row-reversed', 'prefix-column', 'wrap-reversed', 'prefix-nowrap'])(
  'does not transform invalid flex-flow: %s',
  (value) => {
    expect(() => transformCss([['flex-flow', value]])).toThrow()
  }
)
