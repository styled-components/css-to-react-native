import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'

export default [
  {
    input: './src/index.ts',
    external: ['camelize', 'css-color-keywords', 'postcss-value-parser'],
    output: {
      file: './index.js',
      format: 'cjs',
      exports: 'named',
    },
    plugins: [
      typescript({
        declaration: false,
        isolatedDeclarations: false,
        tsconfig: './tsconfig.json',
      }),
    ],
  },
  {
    input: './src/index.ts',
    output: {
      file: './index.d.ts',
      format: 'es',
    },
    plugins: [dts({ tsconfig: './tsconfig.json' })],
  },
]
