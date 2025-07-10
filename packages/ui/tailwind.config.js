import tailwindConfig from '@LiteBoard/tailwind-config';

export default {
  presets: [tailwindConfig],
  content: [
    `./src/**/*.{js,ts,jsx,tsx}`,
    './.storybook/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  safelist: [
    {
      pattern: /^text-\[.*\]$/,
    },
  ],
};
