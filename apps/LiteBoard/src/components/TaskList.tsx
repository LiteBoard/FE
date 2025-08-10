"use client";

import { TodoCard } from "@LiteBoard/ui";
import { useTasks } from "@/hooks/useTasks";
import { Task } from "@/types/api";

// 태스크 상태 매핑
const getTaskStatus = (status: string, daysLeft: number): 'latest' | 'notLatest' | 'delayed' | 'finished' => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'finished';
    case 'overdue':
      return 'delayed';
    case 'today':
      return 'latest';
    default:
      return daysLeft <= 1 ? 'latest' : 'notLatest';
  }
};



// 태스크 목록 컴포넌트
export function TaskList() {
  const { data, isLoading, error } = useTasks();

  if (isLoading) {
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
      <div className="text-gray-500 p-8 text-center">
        <h3 className="text-lg font-medium mb-2">진행 중인 태스크가 없습니다</h3>
        <p>새로운 태스크를 생성해보세요!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.tasks.map((task) => {
        const status = getTaskStatus(task.status, task.daysLeft);
        
        // API Todo 타입을 TodoCard에서 요구하는 타입으로 변환
        const todos = task.todos.map(todo => ({
          id: todo.id.toString(),
          text: todo.description,
          checked: todo.done,
          assignee: todo.member.name,
          requested: todo.isRequired,
        }));

        return (
          <TodoCard
            key={task.taskId}
            status={status}
            title={task.title}
            todos={todos}
          />
        );
      })}
    </div>
  );
} 