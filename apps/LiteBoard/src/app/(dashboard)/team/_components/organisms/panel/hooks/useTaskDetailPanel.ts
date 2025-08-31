import { useState } from 'react';
import { useTaskDetailStore } from '../../../stores/useTaskDetailStore';
import { useTaskById } from '@/hooks/queries/task/useTaskById';
import { useToggleTodos } from '@/hooks/mutations/todo/useToggleTodos';

export const useTaskDetailPanel = () => {
  const { isOpen, closePanel } = useTaskDetailStore();
  const [todoChanges, setTodoChanges] = useState<Map<number, boolean>>(new Map());

  // TODO: 실제 taskId를 store에서 가져오도록 수정
  const taskId = 1;
  
  const { data: taskData, isLoading, error } = useTaskById(taskId, {
    enabled: isOpen
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