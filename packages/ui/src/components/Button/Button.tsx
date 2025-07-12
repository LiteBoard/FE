import { cn } from '../../lib/util';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

export const buttonVariants = cva(
  'pointer:cursor-pointer inline-flex items-center justify-center text-T2 px-5 whitespace-nowrap transition-all disabled:opacity-50 disabled:pointer-events-none hover:scale-105 active:scale-95',
  {
    variants: {
      variant: {
        filled: '',
        weak: '',
        outline: '',
        borderless: '',
      },
      size: {
        el: 'h-12',
        lg: 'h-10',
        md: 'h-9',
      },
      color: {
        black: '',
        blue: '',
        red: '',
      },
      radius: {
        max: 'rounded-full',
        roundCorner: 'rounded-lg',
      },
    },
    compoundVariants: [
      // filled variant의 배경색
      {
        variant: 'filled',
        color: 'black',
        class: 'bg-neutral-800 text-white hover:bg-neutral-900',
      },
      {
        variant: 'filled',
        color: 'blue',
        class: 'bg-blue-500 text-white hover:bg-blue-600',
      },
      {
        variant: 'filled',
        color: 'red',
        class: 'bg-red-500 text-white hover:bg-red-600',
      },
      // weak variant의 텍스트 색상
      {
        variant: 'weak',
        color: 'black',
        class: 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200',
      },
      {
        variant: 'weak',
        color: 'blue',
        class: 'bg-blue-50 text-blue-500 hover:bg-blue-100',
      },
      {
        variant: 'weak',
        color: 'red',
        class: 'bg-red-50 text-red-500 hover:bg-red-100',
      },
      // outline variant의 배경색
      {
        variant: 'outline',
        color: 'black',
        class:
          'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100',
      },
      {
        variant: 'outline',
        color: 'blue',
        class: 'bg-white border border-blue-200 text-blue-500 hover:bg-blue-50',
      },
      {
        variant: 'outline',
        color: 'red',
        class: 'bg-white border border-red-500 text-red-500 hover:bg-red-50',
      },
      // borderless variant의 텍스트 색상
      {
        variant: 'borderless',
        color: 'black',
        class: 'text-neutral-500 bg-white',
      },
      {
        variant: 'borderless',
        color: 'blue',
        class: 'text-blue-500 bg-white',
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
      size: 'el',
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
  className,
  ...props
}: ButtonProps) => (
  <button
    data-button
    className={cn(buttonVariants({ color, variant, radius, size }), className)}
    {...props}
  >
    {children}
  </button>
);

Button.displayName = 'Button';
