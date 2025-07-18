import { cn } from '../../lib/util';

export const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn('rounded-md animate-pulse bg-neutral-500/20', className)}
      {...props}
    />
  );
};
