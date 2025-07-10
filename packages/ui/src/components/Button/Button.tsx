import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

export const buttonVariants = cva(
  'inline-flex items-center justify-center font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      // 3가지 색상
      color: {
        black: 'bg-neutral-800 text-white hover:bg-neutral-700',
        blue: 'bg-blue-500 text-white hover:bg-blue-600',
        red: 'bg-red-500 text-white hover:bg-red-600',
      },
      // 4가지 버튼 variant
      variant: {
        filled: '',
        weak: 'bg-opacity-10 text-opacity-80 hover:bg-opacity-20',
        outline: 'bg-transparent border-2 hover:bg-opacity-10',
        borderless:
          'bg-transparent border-none shadow-none hover:bg-opacity-10',
      },
      // 2가지 radius
      radius: {
        max: 'rounded-full',
        roundCorner: 'rounded-lg',
      },
      // 3가지 size
      size: {
        el: 'h-12 px-6 text-lg', // Extra Large
        lg: 'h-10 px-5 text-base', // Large
        md: 'h-8 px-4 text-sm', // Medium
      },
    },
    compoundVariants: [
      // outline variant의 border 색상
      {
        variant: 'outline',
        color: 'black',
        class: 'border-neutral-800 text-neutral-800 hover:bg-neutral-800',
      },
      {
        variant: 'outline',
        color: 'blue',
        class: 'border-blue-500 text-blue-500 hover:bg-blue-500',
      },
      {
        variant: 'outline',
        color: 'red',
        class: 'border-red-500 text-red-500 hover:bg-red-500',
      },
      // weak variant의 배경색
      {
        variant: 'weak',
        color: 'black',
        class: 'bg-neutral-200 text-neutral-800 hover:bg-neutral-300',
      },
      {
        variant: 'weak',
        color: 'blue',
        class: 'bg-blue-100 text-blue-600 hover:bg-blue-200',
      },
      {
        variant: 'weak',
        color: 'red',
        class: 'bg-red-100 text-red-600 hover:bg-red-200',
      },
      // borderless variant의 텍스트 색상
      {
        variant: 'borderless',
        color: 'black',
        class: 'text-neutral-800 hover:bg-neutral-50',
      },
      {
        variant: 'borderless',
        color: 'blue',
        class: 'text-blue-600 hover:bg-blue-50',
      },
      {
        variant: 'borderless',
        color: 'red',
        class: 'text-red-600 hover:bg-red-50',
      },
    ],
    defaultVariants: {
      color: 'black',
      variant: 'filled',
      radius: 'roundCorner',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

export const Button = ({
  color,
  variant,
  radius,
  size,
  children,
  ...props
}: ButtonProps) => (
  <button
    data-button
    className={buttonVariants({ color, variant, radius, size })}
    {...props}
  >
    {children}
  </button>
);

Button.displayName = 'Button';
