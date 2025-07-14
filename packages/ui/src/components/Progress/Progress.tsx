import { cn } from '../../lib/util';

interface ProgressProps {
  current: number;
  total: number;
  className?: string;
}

export const Progress = ({ current, total, className }: ProgressProps) => {
  const percentage = Math.min((current / total) * 100, 100);

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {/* Progress Bar */}
      <div className="relative w-20 h-2 bg-neutral-300 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-neutral-800 rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Label */}
      <div className="text-sm font-medium text-neutral-600 whitespace-nowrap">
        {current}/{total}
      </div>
    </div>
  );
};
