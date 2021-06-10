const resolve = require('@rollup/plugin-node-resolve').default;
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');

const visualizer = require('rollup-plugin-visualizer').default;
const compiler = require('@ampproject/rollup-plugin-closure-compiler');
const define = require('rollup-plugin-define');
const cleanup = require('rollup-plugin-cleanup');
const sucrase = require('@rollup/plugin-sucrase');
const babel = require('rollup-plugin-babel');
const babelErrorPlugin = require('./react/scripts/error-codes/transform-error-messages');


module.exports = {
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