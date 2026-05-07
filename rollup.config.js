import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/volvo-stats-card.ts',
  output: {
    file: 'dist/volvo-visual-stats.js',
    format: 'es',
    sourcemap: true,
  },
  external: [],
  plugins: [
    resolve(),
    typescript({
      tsconfig: false,
      compilerOptions: {
        target: 'ES2020',
        module: 'ESNext',
        lib: ['ES2020', 'DOM', 'DOM.Iterable'],
        declaration: false,
        strict: true,
        esModuleInterop: true,
        skipLibCheck: true,
        forceConsistentCasingInFileNames: true,
        moduleResolution: 'node',
        experimentalDecorators: true,
        useDefineForClassFields: true,
      },
    }),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.js', '.ts'],
      presets: [
        ['@babel/preset-typescript'],
      ],
      exclude: 'node_modules/**',
    }),
  ],
};
