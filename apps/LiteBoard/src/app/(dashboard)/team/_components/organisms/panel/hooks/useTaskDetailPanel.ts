import { useState, useEffect } from 'react';
import { useTaskDetailStore, type TaskUpdateData } from '../../../stores/useTaskDetailStore';
import { useTaskById } from '@/hooks/queries/task/useTaskById';
import { useToggleTodos } from '@/hooks/mutations/todo/useToggleTodos';
import { useUpdateTask } from '@/hooks/mutations/task/useUpdateTask';
import { transformTaskDataToPanelData } from '../utils/taskDataTransformer';
import { useProjectContext } from '@/providers/ProjectProvider';
import { UpdateTaskRequest } from '@/types/task';

export const useTaskDetailPanel = () => {
  const { isOpen, selectedTask, closePanel, originalTaskData, openPanel } = useTaskDetailStore();
  const { selectedProjectId } = useProjectContext();
  const [todoChanges, setTodoChanges] = useState<Map<number, boolean>>(new Map());

  const taskId = selectedTask?.id;

  const { data: taskData, isLoading, error } = useTaskById(taskId!, {
    enabled: isOpen && !!taskId
  });

  const toggleTodosMutation = useToggleTodos();
  const updateTaskMutation = useUpdateTask();

  const panelData = taskData ? transformTaskDataToPanelData(taskData) : null;

  useEffect(() => {
    if (taskData && !originalTaskData) {
      const taskUpdateData: TaskUpdateData = {
        title: taskData.title,
        description: '',
        status: taskData.status,
        startDate: taskData.startDate,
        endDate: taskData.endDate
      };

      openPanel(taskData, taskUpdateData);
    }
  }, [taskData, originalTaskData, openPanel]);

  const handleTodoChanges = (changes: Map<number, boolean>) => {
    setTodoChanges(changes);
  };

  const handleUpdateTask = async (data: TaskUpdateData) => {
    if (!taskId) return;

    const updateRequest: UpdateTaskRequest = {
      title: data.title,
      description: data.description,
      status: data.status,
      startDate: data.startDate,
      endDate: data.endDate
    };

    await updateTaskMutation.mutateAsync({
      taskId,
      taskData: updateRequest
    });

    console.log('태스크 업데이트 완료:', updateRequest);
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
    await closePanel(handleUpdateTask);
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