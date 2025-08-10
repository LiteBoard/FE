"use client";

import { DashboardSummary } from "@LiteBoard/ui";
import { useTasks } from "@/hooks/useTasks";
import { TaskList } from "@/components/TaskList";

export default function MyWorkPage() {
  const { data, isLoading, error } = useTasks();

  if (isLoading) {
    return (
      <div className="relative">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-6 w-64"></div>
          <div className="flex gap-6">
            <div className="w-[265px] h-[148px] bg-gray-200 rounded-3xl"></div>
            <div className="w-[265px] h-[148px] bg-gray-200 rounded-3xl"></div>
            <div className="w-[265px] h-[148px] bg-gray-200 rounded-3xl"></div>
          </div>
        </div>
        <div className="absolute mt-[36px] h-[12px] bg-neutral-100 -left-11 -right-11"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative">
        <div className="text-red-500 p-4 bg-red-50 rounded-lg">
          <h2 className="font-bold mb-2">데이터 로딩 오류</h2>
          <p>{error.message}</p>
        </div>
        <div className="absolute mt-[36px] h-[12px] bg-neutral-100 -left-11 -right-11"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="relative">
        <div className="text-gray-500 p-4">데이터가 없습니다.</div>
        <div className="absolute mt-[36px] h-[12px] bg-neutral-100 -left-11 -right-11"></div>
      </div>
    );
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
      <div className="mt-16">
        <TaskList />
      </div>
    </div>
  );
}
