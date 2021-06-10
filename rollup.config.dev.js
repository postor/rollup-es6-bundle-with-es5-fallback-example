import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

import visualizer from 'rollup-plugin-visualizer';

export default {
  input: [
    './src/index.tsx'
  ],
  output: {
    file:'dist/bundle.dev.js',
    format: 'esm',
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json'
    }),
    // terser(),
    visualizer({
      filename: 'bundle-analysis.html',
      open: true,
    }),
  ],
  // external: ['react', 'react-dom'],
};