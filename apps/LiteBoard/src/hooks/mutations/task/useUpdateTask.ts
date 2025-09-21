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
      console.log('🔍 useUpdateTask onSuccess - updatedTask:', updatedTask);

      // 서버 응답이 불완전한 경우 캐시 데이터를 직접 수정하지 않고 무효화만 진행
      // queryClient.setQueryData(['tasks', 'detail', taskId], updatedTask);

      // 업무 상세 정보 다시 fetch
      queryClient.invalidateQueries({ queryKey: ['tasks', 'detail', taskId] });

      // 관련된 모든 업무 목록 무효화 (카테고리별)
      queryClient.invalidateQueries({ queryKey: ['tasks', 'list'] });
    },
    onError: (error) => {
      console.error('업무 수정 실패:', error);
    },
  });
}; 