import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '@/services/taskService';

// 업무 담당자 제거 훅
export const useRemoveTaskMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, memberId }: { taskId: number; memberId: number }) =>
      taskService.removeMember(taskId, memberId),
    onSuccess: (_, { taskId }) => {
      // 업무 상세 정보 무효화 (담당자 정보가 변경됨)
      queryClient.invalidateQueries({ queryKey: ['tasks', 'detail', taskId] });
      
      // 관련된 모든 업무 목록 무효화 (카테고리별)
      queryClient.invalidateQueries({ queryKey: ['tasks', 'list'] });
    },
    onError: (error) => {
      console.error('업무 담당자 제거 실패:', error);
    },
  });
}; 