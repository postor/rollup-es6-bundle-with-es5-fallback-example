import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

import visualizer from 'rollup-plugin-visualizer';
import compiler from '@ampproject/rollup-plugin-closure-compiler';
import define from 'rollup-plugin-define';
import cleanup from 'rollup-plugin-cleanup';


export default {
  input: [
    './src/index.tsx'
  ],
  output: {
    file: 'dist/bundle.closure.js',
    format: 'es',
  },
  plugins: [
    resolve(),
    commonjs(),
    define({
      replacements: {
        'process.env.NODE_ENV': '"production"'
      },
    }),
    typescript({
      tsconfig: './tsconfig.json'
    }),
    compiler({
      'compilation_level': 'ADVANCED'
    }),
    cleanup({comments:'none'}),
    visualizer({
      filename: 'bundle-analysis.html',
      open: true,
    }),
  ],
  // external: ['react', 'react-dom'],
};