"use client";

import { DashboardSummary, TodoCard } from "@LiteBoard/ui";
import { useTasks } from "@/hooks/useTasks";
import { useProjectContext } from "@/providers/ProjectProvider";
import { TaskList } from "@/components/TaskList";

export default function MyWorkPage() {
  const { selectedProjectId } = useProjectContext();
  const { data, isLoading, error } = useTasks(selectedProjectId);



  // 프로젝트가 선택되지 않았거나 로딩 중일 때
  if (!selectedProjectId || isLoading) {
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
      
      {/* 임시 TodoCard 테스트 */}
      <div className="mt-16 mb-8">
        <h3 className="text-lg font-bold mb-4">TodoCard 테스트</h3>
        <TodoCard
          status="latest"
          title="프론트엔드 개발 작업"
          todos={[
            {
              id: "1",
              text: "로그인 페이지 구현",
              checked: true,
              assignee: "홍길동",
              requested: false,
            },
            {
              id: "2", 
              text: "대시보드 API 연동",
              checked: false,
              assignee: "김철수",
              requested: true,
            },
            {
              id: "3",
              text: "TodoCard 컴포넌트 테스트",
              checked: false,
              assignee: "이영희",
              requested: false,
            },
          ]}
        />
      </div>

      {/* 태스크 목록 */}
      <div className="mt-8">
        <TaskList />
      </div>
    </div>
  );
}
