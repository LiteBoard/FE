import { useState } from 'react';
import { useTaskDetailStore } from '../../../stores/useTaskDetailStore';
import { useTaskById } from '@/hooks/queries/task/useTaskById';
import { useToggleTodos } from '@/hooks/mutations/todo/useToggleTodos';

export const useTaskDetailPanel = () => {
  const { isOpen, selectedTask, closePanel } = useTaskDetailStore();
  const [todoChanges, setTodoChanges] = useState<Map<number, boolean>>(new Map());

  // 선택된 태스크의 ID 사용
  const taskId = selectedTask?.id;
  
  const { data: taskData, isLoading, error } = useTaskById(taskId!, {
    enabled: isOpen && !!taskId
  });
  
  const toggleTodosMutation = useToggleTodos();

  const handleTodoChanges = (changes: Map<number, boolean>) => {
    setTodoChanges(changes);
  };

  const handleClosePanel = async () => {
    if (todoChanges.size > 0) {
      try {
        const todoIds = Array.from(todoChanges.keys());
        await toggleTodosMutation.mutateAsync(todoIds);
        console.log('투두 변경사항 저장 완료:', todoIds);
      } catch (error) {
        console.error('투두 변경사항 저장 실패:', error);
      }
    }
    
    setTodoChanges(new Map());
    closePanel();
  };

  return {
    isOpen,
    taskId,
    taskData,
    isLoading,
    error,
    todoChanges,
    handleTodoChanges,
    handleClosePanel,
  };
}; 