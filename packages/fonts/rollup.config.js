import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import postcss from 'rollup-plugin-postcss';

export default {
  input: './index.js',
  output: [
    {
      file: 'dist/index.cjs',
      format: 'cjs',
    },
    {
      file: 'dist/index.mjs',
      format: 'esm',
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    postcss({
      extract: true,
      modules: false,
      inject: false,
      url: {
        publicPath: './fonts/',
      },
    }),
    copy({
      targets: [
        {
          src: 'fonts/*',
          dest: 'dist/fonts',
        },
        {
          src: 'styles.css',
          dest: 'dist/styles.css',
        },
      ],
      // 빌드 시 폴더가 없으면 생성
      flatten: false,
      verbose: true,
    }),
  ],
};
