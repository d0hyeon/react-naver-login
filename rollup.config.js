import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';

import pkg from './package.json';

export default {
  input: 'src/index.ts',
  external: [
    ...Object.keys(pkg.dependencies)
  ],
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      plugins:[getBabelOutputPlugin({presets: ['@babel/preset-env']})]
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true,
      plugins:[getBabelOutputPlugin({presets: ['@babel/preset-env']})]
    },
  ],
  plugins: [
    external(),
    resolve({
      preferBuiltins: false,
      browser: true,
    }),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true,
    }),
    commonjs({
      include: ['node_modules/**'],
    }),
  ],
};
