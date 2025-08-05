import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/util';

export const summaryCardVariants = cva(
  'flex flex-row bg-neutral-100 rounded-3xl px-[32px] py-[28px] max-w-[265px] h-[148px] shadow-sm',
  {
    variants: {
      color: {
        red: '',
        blue: '',
        default: '',
      },
    },
    compoundVariants: [
      {
        color: 'red',
        class: '',
      },
      {
        color: 'blue',
        class: '',
      },
      {
        color: 'default',
        class: '',
      },
    ],
    defaultVariants: {
      color: 'default',
    },
  }
);

export interface SummaryCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof summaryCardVariants> {
  label: string;
  count: number;
}

export const SummaryCard = ({ 
  label, 
  count, 
  color = 'default',
  className,
  ...props 
}: SummaryCardProps) => {
  const colorMap = {
    red: 'text-red-500',
    blue: 'text-blue-500',
    default: 'text-neutral-800',
  };

  const textColor = colorMap[color || 'default'];

  return (
    <div className={cn(summaryCardVariants({ color }), className)} {...props}>
      <div className="flex gap-[44px] justify-between items-end w-full">
        <p className="text-neutral-500 text-text-B1M">{label}</p>
        <p className={`text-text-H1 ${textColor}`}>{count}</p>
      </div>
    </div>
  );
};
