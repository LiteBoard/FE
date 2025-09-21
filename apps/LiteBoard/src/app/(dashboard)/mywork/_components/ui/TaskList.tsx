"use client";

import { TodoCard, HelpIcon } from "@LiteBoard/ui";
import { useProjectMyTasks } from "@/hooks";
import { useProjectContext } from "@/providers/ProjectProvider";
import { transformTaskForTodoCard } from "../utils/taskUtils";
import { TaskListReturn } from "../types";
import { useCallback } from "react";
import { todoService } from "@/services/todoService";
import { useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "@/lib/store/user";

// 태스크 목록 컴포넌트
export function TaskList(): TaskListReturn {
  const { selectedProjectId } = useProjectContext();
  const { data, isLoading, error } = useProjectMyTasks(selectedProjectId);
  const queryClient = useQueryClient();
  const { user } = useUserStore();

  // Todo 체크 상태 변경 핸들러
  const handleTodoChange = useCallback(async (todoId: string) => {
    try {
      await todoService.toggleTodos([parseInt(todoId)]);
      // 캐시 무효화로 데이터 새로고침
      queryClient.invalidateQueries({ queryKey: ['my-tasks', selectedProjectId] });
    } catch (error) {
      console.error('Todo 체크 상태 변경 실패:', error);
    }
  }, [selectedProjectId, queryClient]);

  // Todo 추가 핸들러
  const handleTodoAdd = useCallback(async (taskId: string, text: string) => {
    if (!user?.id) {
      console.error('사용자 정보가 없습니다.');
      return;
    }

    try {
      await todoService.create(parseInt(taskId), {
        description: text,
        memberId: user.id
      });
      // 캐시 무효화로 데이터 새로고침
      queryClient.invalidateQueries({ queryKey: ['my-tasks', selectedProjectId] });
    } catch (error) {
      console.error('Todo 추가 실패:', error);
      throw error;
    }
  }, [selectedProjectId, queryClient, user?.id]);

  // Todo 삭제 핸들러
  const handleTodoDelete = useCallback(async (todoId: string) => {
    try {
      await todoService.delete(parseInt(todoId));
      // 캐시 무효화로 데이터 새로고침
      queryClient.invalidateQueries({ queryKey: ['my-tasks', selectedProjectId] });
    } catch (error) {
      console.error('Todo 삭제 실패:', error);
    }
  }, [selectedProjectId, queryClient]);

  if (!selectedProjectId || isLoading) {
    return (
      <div className="grid grid-cols-3 gap-6">
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
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center pb-8">
        <HelpIcon className="text-neutral-300 mb-4" width={40} height={40} />
        <p className="text-neutral-500 text-lg mb-2">아직 생성된 내 업무가 없습니다.</p>
        <p className="text-neutral-400 text-sm">지금 바로 할 일을 생성하고 관리해 보세요!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-[24px]">
      {data.tasks.map((task) => {
        const { status, title, todos, taskId } = transformTaskForTodoCard(task);

        return (
          <TodoCard
            key={taskId}
            status={status}
            title={title}
            todos={todos}
            taskId={taskId}
            onTodoChange={handleTodoChange}
            onTodoAdd={(text) => handleTodoAdd(taskId, text)}
            onTodoDelete={handleTodoDelete}
          />
        );
      })}
    </div>
  );
} 