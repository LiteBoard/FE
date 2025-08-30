import React from 'react';
import { DashboardSummary } from '@LiteBoard/ui';
import { TaskList } from './TaskList';
import { LoadingState, ErrorState, EmptyState } from '../states/';
import { TasksResponse } from '@/types/api';
import { useUserStore } from '@/lib/store/user';

interface MyWorkViewProps {
  selectedProjectId: string | number | null;
  data: TasksResponse | undefined;
  isLoading: boolean;
  error: Error | null;
}

export const MyWorkView: React.FC<MyWorkViewProps> = ({
  data,
  isLoading,
  error,
}) => {
  const { user } = useUserStore();

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error.message} />;
  }

  if (!data) {
    return (
      <EmptyState description="프로젝트를 선택하고 태스크를 추가해보세요." />
    );
  }

  return (
    <div className="relative px-11">
      <DashboardSummary
        total={data.totalTodoCount}
        completed={data.completedTodoCount}
        pending={data.pendingTodoCount}
        userName={user?.nickname ?? ''}
      />
      <div className="absolute mt-[36px] h-[12px] bg-neutral-100 -left-11 -right-11"></div>

      {/* 태스크 목록 */}
      <div className="mt-8">
        <TaskList />
      </div>
    </div>
  );
};
