import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/util';
import { SummaryCard } from './SummaryCard';

export const dashboardSummaryVariants = cva(
  '',
  {
    variants: {
      layout: {
        default: '',
        compact: 'gap-4',
      },
    },
    defaultVariants: {
      layout: 'default',
    },
  }
);

export interface DashboardSummaryProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof dashboardSummaryVariants> {
  total: number;
  completed: number;
  pending: number;
  userName: string;
}

export const DashboardSummary = ({
  total,
  completed,
  pending,
  userName,
  layout = 'default',
  className,
  ...props
}: DashboardSummaryProps) => {
  return (
    <div className={cn(dashboardSummaryVariants({ layout }), className)} {...props}>
      <h2 className="text-xl font-semibold mb-6">
        안녕하세요, <span className="font-bold">{userName} 님!</span>
      </h2>
      <div className="flex gap-6">
        <SummaryCard label="전체 To-do" count={total} />
        <SummaryCard label="미완료" count={pending} color="red" />
        <SummaryCard label="완료" count={completed} color="blue" />
      </div>
    </div>
  );
};
