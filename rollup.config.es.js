import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

import visualizer from 'rollup-plugin-visualizer';
import compiler from '@ampproject/rollup-plugin-closure-compiler';
import define from 'rollup-plugin-define';
import cleanup from 'rollup-plugin-cleanup';
import sucrase from '@rollup/plugin-sucrase';
import babel from 'rollup-plugin-babel';
import * as babelErrorPlugin from './react/scripts/error-codes/transform-error-messages'


export default {
  input: [
    './src/index.tsx'
  ],
  output: {
    file: 'dist/bundle.js',
    format: 'es',
  },
  plugins: [
    sucrase({
      exclude: ['node_modules/**'],
      transforms: ['flow']
    }),
    resolve({
      moduleDirectories: ['react/packages', 'node_modules']
    }),
    commonjs(),
    define({
      replacements: {
        'process.env.NODE_ENV': '"production"',
        __DEV__: 'false',
        __EXPERIMENTAL__: 'true',
        __PROFILE__: 'false',
        __UMD__: 'false',
        __TEST__: 'false',
        __DEV__: 'false',
        __EXTENSION__: 'false',
        __VARIANT__: 'false'
      },
    }),
    typescript({
      tsconfig: './tsconfig.json'
    }),
    babel({
      plugins: [
        babelErrorPlugin
      ]
    }),
    // strip({
    //   functions:[ 'invariant','console.log', 'assert.*', 'debug', 'alert' ]
    // }),
    compiler({
      compilation_level: 'ADVANCED',
      language_out: 'ECMASCRIPT_2020'
    }),
    cleanup({ comments: 'none' }),
    visualizer({
      filename: 'bundle-analysis.html',
      open: true,
    }),
  ],
  // external: ['react', 'react-dom'],
};