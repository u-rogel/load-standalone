import { babel } from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'
import cleanup from 'rollup-plugin-cleanup'
import { terser } from 'rollup-plugin-terser'

const config = {
  input: 'src/index.ts',
  output: {
    format: 'esm',
    file: 'dist/index.js',
    plugins: [terser()],
  },
  plugins: [
    typescript(),
    babel({ babelHelpers: 'bundled' }),
    cleanup(),
  ],
}

export default config
