import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '@/services/taskService';

// 업무 담당자 배정 훅
export const useAssignTaskMembers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, memberIds }: { taskId: number; memberIds: number[] }) =>
      taskService.assignMembers(taskId, memberIds),
    onSuccess: (_, { taskId }) => {
      // 업무 상세 정보 무효화 (담당자 정보가 변경됨)
      queryClient.invalidateQueries({ queryKey: ['tasks', 'detail', taskId] });
      
      // 관련된 모든 업무 목록 무효화 (카테고리별)
      queryClient.invalidateQueries({ queryKey: ['tasks', 'list'] });
    },
    onError: (error) => {
      console.error('업무 담당자 배정 실패:', error);
    },
  });
}; 