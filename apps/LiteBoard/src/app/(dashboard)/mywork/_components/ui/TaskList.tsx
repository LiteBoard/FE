"use client";

import { TodoCard, HelpIcon } from "@LiteBoard/ui";
import { useTasks } from "@/hooks/useTasks";
import { useProjectContext } from "@/providers/ProjectProvider";
import { transformTaskForTodoCard } from "../utils/taskUtils";
import { TaskListReturn } from "../types";

// 태스크 목록 컴포넌트
export function TaskList(): TaskListReturn {
  const { selectedProjectId } = useProjectContext();
  const { data, isLoading, error } = useTasks(selectedProjectId);

  if (!selectedProjectId || isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="w-[388px] h-[300px] bg-gray-200 rounded-2xl"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 bg-red-50 rounded-lg">
        <h2 className="font-bold mb-2">태스크 로딩 오류</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  if (!data || !data.tasks || data.tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <HelpIcon className="text-neutral-300 mb-4" width={40} height={40} />
        <p className="text-neutral-500 text-lg mb-2">아직 생성된 내 업무가 없습니다.</p>
        <p className="text-neutral-400 text-sm">새로운 업무 일정을 생성하고 관리에 도전하세요!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.tasks.map((task) => {
        const { status, title, todos, taskId } = transformTaskForTodoCard(task);

        return (
          <TodoCard
            key={taskId}
            status={status}
            title={title}
            todos={todos}
          />
        );
      })}
    </div>
  );
} 