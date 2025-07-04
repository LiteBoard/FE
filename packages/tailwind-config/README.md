# Tailwind Config

This package contains the shared Tailwind CSS configuration for the monorepo.

## Features

- **Custom Color Palette**: Primary and secondary color schemes
- **Typography**: Custom font families (Inter, JetBrains Mono)
- **Spacing**: Extended spacing scale
- **Shadows**: Custom shadow variants (soft, medium, large)
- **Animations**: Custom keyframes and animation utilities
- **Plugins**: Forms, Typography, and Aspect Ratio plugins

## Usage

### In Apps

1. Install the package as a dependency:

   ```bash
   pnpm add tailwind-config
   ```

2. Create a `tailwind.config.js` in your app:

   ```js
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     presets: [require("tailwind-config")],
     content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
   };
   ```

3. Create a `postcss.config.js`:

   ```js
   module.exports = {
     plugins: {
       tailwindcss: {},
       autoprefixer: {},
     },
   };
   ```

4. Import Tailwind in your CSS:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

### Custom Configuration

You can extend the base configuration by adding your own theme extensions:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("tailwind-config")],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      // Your custom theme extensions
      colors: {
        brand: {
          primary: "#your-color",
        },
      },
    },
  },
};
```

## Available Utilities

### Colors

- `primary-{50-950}`: Primary color palette
- `secondary-{50-950}`: Secondary color palette

### Animations

- `animate-fade-in`: Fade in animation
- `animate-slide-up`: Slide up animation
- `animate-slide-down`: Slide down animation
- `animate-scale-in`: Scale in animation

### Shadows

- `shadow-soft`: Soft shadow
- `shadow-medium`: Medium shadow
- `shadow-large`: Large shadow

### Spacing

- Extended spacing scale including `18`, `88`, `128`

## Development

To modify the shared configuration, edit the `index.js` file and rebuild the package:

```bash
pnpm build
```
