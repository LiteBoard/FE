import type { StorybookConfig } from '@storybook/react-vite';
import { InlineConfig } from 'vite';
import { join, dirname, resolve } from 'path';

function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, 'package.json')));
}
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-vitest'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },

  async viteFinal(config: InlineConfig) {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': resolve(__dirname, '../src'),
    };

    // Tailwind CSS 설정 추가
    config.css = config.css || {};
    config.css.postcss = {
      plugins: [
        require('tailwindcss')(resolve(__dirname, '../tailwind.config.js')),
        require('autoprefixer'),
      ],
    };

    return config;
  },
};
export default config;
