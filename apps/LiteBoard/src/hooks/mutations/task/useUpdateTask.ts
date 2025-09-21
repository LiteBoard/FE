import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '@/services/taskService';
import { UpdateTaskRequest } from '@/types/task';
import { CategoryQueryKeys } from '@/constants/query-keys';
import { useProjectContext } from '@/providers/ProjectProvider';

// 업무 수정 훅
export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const { selectedProjectId } = useProjectContext();

  return useMutation({
    mutationFn: ({ taskId, taskData }: { taskId: number; taskData: UpdateTaskRequest }) =>
      taskService.update(taskId, taskData),
    onSuccess: (updatedTask, { taskId }) => {
      console.log('🔍 useUpdateTask onSuccess - updatedTask:', updatedTask);

      queryClient.invalidateQueries({ queryKey: ['tasks', 'detail', taskId] });

      queryClient.invalidateQueries({ queryKey: ['tasks', 'list'] });

      if (selectedProjectId) {
        queryClient.invalidateQueries({
          queryKey: [CategoryQueryKeys.CATEGORY_LIST, selectedProjectId]
        });
      }
    },
    onError: (error) => {
      console.error('업무 수정 실패:', error);
    },
  });
}; 