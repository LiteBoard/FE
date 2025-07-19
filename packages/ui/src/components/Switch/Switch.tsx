'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/util';

const switchVariants = cva(
  'inline-flex items-center w-[54px] h-[32px] rounded-full transition-colors duration-200 cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-neutral-400',
        active: 'bg-blue-500',
      },
      isDisabled: {
        true: 'opacity-50 cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      isDisabled: false,
    },
  }
);

const thumbVariants = cva(
  'inline-block w-[28px] h-[28px] bg-white rounded-full shadow transform transition-transform duration-200',
  {
    variants: {
      checked: {
        true: 'translate-x-5',
        false: 'translate-x-1',
      },
    },
  }
);

export interface SwitchProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof switchVariants> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, checked, onCheckedChange, disabled, ...props }, ref) => {
    const [internalChecked, setChecked] = React.useState(checked ?? false);

    const handleClick = () => {
      if (disabled) return;
      const newChecked = !internalChecked;
      setChecked(newChecked);
      onCheckedChange?.(newChecked);
    };

    React.useEffect(() => {
      if (typeof checked === 'boolean') {
        setChecked(checked);
      }
    }, [checked]);

    return (
      <button
        type="button"
        role="switch"
        aria-checked={internalChecked}
        disabled={disabled}
        ref={ref}
        onClick={handleClick}
        className={cn(
          switchVariants({
            variant: internalChecked ? 'active' : 'default',
            isDisabled: !!disabled,
          }),
          className
        )}
        {...props}
      >
        <span
          className={thumbVariants({
            checked: internalChecked,
          })}
        />
      </button>
    );
  }
);

Switch.displayName = 'Switch';
