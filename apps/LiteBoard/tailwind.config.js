/** @type {import('tailwindcss').Config} */
import { default as tailwindConfig } from '@LiteBoard/tailwind-config';

export default {
  presets: [tailwindConfig],
  content: [
   `src/**/*.{js,ts,jsx,tsx}`,
    '../../packages/tailwind-config/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
} 