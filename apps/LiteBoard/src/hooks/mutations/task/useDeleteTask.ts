import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '@/services/taskService';

// 업무 삭제 훅
export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: number) => taskService.delete(taskId),
    onSuccess: (_, taskId) => {
      // 업무 상세 정보 제거
      queryClient.removeQueries({ queryKey: ['tasks', 'detail', taskId] });
      
      // 관련된 모든 업무 목록 무효화 (카테고리별)
      queryClient.invalidateQueries({ queryKey: ['tasks', 'list'] });
    },
    onError: (error) => {
      console.error('업무 삭제 실패:', error);
    },
  });
}; 