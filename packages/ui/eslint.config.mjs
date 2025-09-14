import { config } from '@LiteBoard/eslint-config/react-internal';

/** @type {import('eslint').Linter.Config} */
export default [
  ...config,
  {
    files: ['**/.storybook/**/*'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    files: ['**/postcss.config.*'],
    rules: {
      'no-undef': 'off',
    },
  },
  {
    files: ['**/*.stories.*'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      'react-hooks/rules-of-hooks': 'warn',
    },
  },
];
