import { cva } from 'class-variance-authority';

export const chipVariants = cva(
  'inline-flex items-center justify-center transition-colors whitespace-nowrap px-2 cursor-pointer',
  {
    variants: {
      variant: {
        filled: '',
        weak: '',
      },
      color: {
        blue: '',
        green: '',
        red: '',
        black: '',
        gray: '',
      },
      size: {
        lg: 'h-8 text-T2',
        md: 'h-7 text-T3',
        sm: 'h-6 text-B3M',
      },
      radius: {
        max: 'rounded-full',
        md: 'rounded-[12px]',
      },
    },
    compoundVariants: [
      // Filled
      { variant: 'filled', color: 'blue', class: 'bg-blue-500 text-white' },
      { variant: 'filled', color: 'green', class: 'bg-green-500 text-white' },
      { variant: 'filled', color: 'red', class: 'bg-red-500 text-white' },
      { variant: 'filled', color: 'black', class: 'bg-neutral-800 text-white' },

      // Weak with hover
      {
        variant: 'weak',
        color: 'blue',
        class: 'bg-blue-50 text-blue-500 hover:bg-blue-100',
      },
      {
        variant: 'weak',
        color: 'green',
        class: 'bg-green-50 text-green-500 hover:bg-green-100',
      },
      {
        variant: 'weak',
        color: 'red',
        class: 'bg-red-50 text-red-500 hover:bg-red-100',
      },
      {
        variant: 'weak',
        color: 'black',
        class: 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200',
      },
    ],
    defaultVariants: {
      variant: 'filled',
      color: 'gray',
      size: 'md',
      radius: 'max', // 기본은 rounded-full
    },
  }
);
