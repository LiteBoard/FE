import * as React from 'react';

import { cn } from '../../lib/util';

interface TextFieldProps extends React.ComponentProps<'textarea'> {
  ref?: React.Ref<HTMLTextAreaElement>;
}

const TextField = ({ className, ref, ...props }: TextFieldProps) => {
  return (
    <textarea
      className={cn(
        'flex px-4 py-3 w-full h-full rounded-md border resize-none scrollbar-thin scrollbar-thumb-neutral-200 scrollbar-track-transparent bg-neutral-white text-text-B3R text-neutral-700 border-neutral-200 placeholder:text-neutral-400 focus-visible:outline-none focus:border-blue-500 hover:border-blue-200 focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className
      )}
      ref={ref}
      {...props}
    />
  );
};

export { TextField };
