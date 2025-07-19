import { cn } from '../../lib/util';
import React from 'react';

interface InputLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
}

export const InputLabel = React.forwardRef<HTMLInputElement, InputLabelProps>(
  ({ className, type = 'text', label, required, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-2">
        {label && (
          <div className="relative inline-block w-fit">
            <label className="text-sm font-medium text-neutral-600">
              {label}
            </label>
            {required && (
              <span className="absolute -top-1 -right-2 text-red-500 text-base leading-none">
                •
              </span>
            )}
          </div>
        )}
        <input
          type={type}
          className={cn(
            'w-[340px] rounded-md border-[1.5px] border-blue-200 px-4 py-3 text-neutral-700 placeholder-neutral-400 focus:outline-none focus:border-blue-500',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

InputLabel.displayName = 'InputLabel';
