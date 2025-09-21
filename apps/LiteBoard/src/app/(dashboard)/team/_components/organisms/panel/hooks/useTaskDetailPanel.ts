import { useState } from 'react';
import { useTaskDetailStore } from '../../../stores/useTaskDetailStore';
import { useTaskById } from '@/hooks/queries/task/useTaskById';
import { useToggleTodos } from '@/hooks/mutations/todo/useToggleTodos';
import { transformTaskDataToPanelData } from '../utils/taskDataTransformer';
import { useProjectContext } from '@/providers/ProjectProvider';

export const useTaskDetailPanel = () => {
  const { isOpen, selectedTask, closePanel } = useTaskDetailStore();
  const { selectedProjectId } = useProjectContext();
  const [todoChanges, setTodoChanges] = useState<Map<number, boolean>>(new Map());

  // 선택된 태스크의 ID 사용
  const taskId = selectedTask?.id;
  
  const { data: taskData, isLoading, error } = useTaskById(taskId!, {
    enabled: isOpen && !!taskId
  });
  
  const toggleTodosMutation = useToggleTodos();

  // API 데이터를 UI 데이터로 변환
  const panelData = taskData ? transformTaskDataToPanelData(taskData) : null;

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
    projectId: selectedProjectId,
    taskData,
    panelData,
    isLoading,
    error,
    todoChanges,
    handleTodoChanges,
    handleClosePanel,
  };
}; 