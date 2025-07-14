import React from 'react';
import { chipVariants } from './chipVariants';
import { cn } from '../../lib/util';
import { VariantProps } from 'class-variance-authority';

export interface ChipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof chipVariants> {
  children: React.ReactNode;
}

export const Chip = ({
  variant,
  color,
  size,
  radius,
  className,
  children,
  ...props
}: ChipProps) => {
  return (
    <div className={cn(chipVariants({ variant, color, size, radius }), className)} {...props}>
      {children}
    </div>
  );
};

Chip.displayName = 'Chip';
