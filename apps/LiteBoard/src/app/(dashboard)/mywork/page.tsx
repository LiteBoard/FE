"use client";

import { DashboardSummary } from "@LiteBoard/ui";
import { useTasks } from "@/hooks/useTasks";
import { useProjectContext } from "@/providers/ProjectProvider";
import { TaskList } from "@/components/TaskList";
import { LoadingState, ErrorState, EmptyState } from "./_components";

export default function MyWorkPage() {
  const { selectedProjectId } = useProjectContext();
  const { data, isLoading, error } = useTasks(selectedProjectId);



  // 프로젝트가 선택되지 않았거나 로딩 중일 때
  if (!selectedProjectId || isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error.message} />;
  }

  if (!data) {
    return <EmptyState description="프로젝트를 선택하고 태스크를 추가해보세요." />;
  }

  return (
    <div className="relative">
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
  );
}
