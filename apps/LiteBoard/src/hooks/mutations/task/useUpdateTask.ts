import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '@/services/taskService';
import { UpdateTaskRequest } from '@/types/task';

// 업무 수정 훅
export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, taskData }: { taskId: number; taskData: UpdateTaskRequest }) =>
      taskService.update(taskId, taskData),
    onSuccess: (updatedTask, { taskId }) => {
      // 업무 상세 정보 업데이트
      queryClient.setQueryData(['tasks', 'detail', taskId], updatedTask);
      
      // 관련된 모든 업무 목록 무효화 (카테고리별)
      queryClient.invalidateQueries({ queryKey: ['tasks', 'list'] });
    },
    onError: (error) => {
      console.error('업무 수정 실패:', error);
    },
  });
}; 