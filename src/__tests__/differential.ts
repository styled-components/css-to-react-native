import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { expect, it, vi } from 'vitest'
import transform, {
  getPropertyName,
  getStylesForProperty,
  transformRawValue,
} from '..'

type Row = {
  call:
    | 'transform'
    | 'getPropertyName'
    | 'getStylesForProperty'
    | 'transformRawValue'
  args: unknown[]
  encoded?: string
  error?: string
  warns: string[]
}

const golden = JSON.parse(
  readFileSync(
    join(dirname(fileURLToPath(import.meta.url)), 'differentialGolden.json'),
    'utf8'
  )
) as Row[]

const fns = {
  transform,
  getPropertyName,
  getStylesForProperty,
  transformRawValue,
}

// JSON has no undefined, so the golden file marks those results explicitly.
function encode(value: unknown): string {
  return JSON.stringify(value, (_key, item) =>
    item === undefined ? '__UNDEF__' : item
  )
}

it('matches recorded output, thrown errors, and warnings', () => {
  expect(golden.length).toBeGreaterThan(1000)

  for (const [index, row] of golden.entries()) {
    const warns: string[] = []
    const spy = vi
      .spyOn(console, 'warn')
      .mockImplementation((...args: unknown[]) => {
        warns.push(args.map((item) => String(item)).join(' '))
      })

    const actual: { encoded?: string; error?: string; warns: string[] } = {
      warns,
    }
    try {
      const fn = fns[row.call] as (...args: unknown[]) => unknown
      actual.encoded = encode(fn(...row.args))
    } catch (error) {
      actual.error = error instanceof Error ? error.message : String(error)
    } finally {
      spy.mockRestore()
    }

    const expected: { encoded?: string; error?: string; warns: string[] } = {
      warns: row.warns,
    }
    if (row.error !== undefined) expected.error = row.error
    else expected.encoded = row.encoded

    expect(actual, `case ${index} ${row.call} ${encode(row.args)}`).toEqual(
      expected
    )
  }
})
