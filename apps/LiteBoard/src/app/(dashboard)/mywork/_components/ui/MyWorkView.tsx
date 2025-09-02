import React from 'react';
import { DashboardSummary } from '@LiteBoard/ui';
import { TaskList } from './TaskList';
import { LoadingState, ErrorState, EmptyState } from '../states/';
import { MyTasksResponse } from '@/types/project';
import { useUserStore } from '@/lib/store/user';


interface MyWorkViewProps {
  selectedProjectId: string | number | null;
  data: MyTasksResponse | undefined;
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
    return (
      <div className="h-full overflow-y-auto">
        <ErrorState message={error.message} />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="h-full overflow-y-auto">
        <EmptyState 
          description="프로젝트를 선택하고 태스크를 추가해보세요." 
        />
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="relative px-11 pb-8">
        <DashboardSummary
          total={data.totalTodoCount}
          completed={data.completedTodoCount}
          pending={data.pendingTodoCount}
          userName={data.myInfo.nickname}
        />
        <div className="absolute mt-[36px] h-[12px] bg-neutral-100 -left-11 -right-11"></div>

        {/* 태스크 목록 */}
        <div className="mt-8">
          <TaskList />
        </div>
      </div>
    </div>
  );
};
