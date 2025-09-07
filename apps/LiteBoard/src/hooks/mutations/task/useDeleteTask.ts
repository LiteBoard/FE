import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '@/services/taskService';
import { CategoryQueryKeys } from '@/constants/query-keys';

// 업무 삭제 훅
export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: number) => taskService.delete(taskId),
    onSuccess: (_, taskId) => {
      // 1. 업무 상세 정보 제거
      queryClient.removeQueries({ queryKey: ['tasks', 'detail', taskId] });
      
      // 2. 관련된 모든 업무 목록 무효화 (카테고리별)
      queryClient.invalidateQueries({ queryKey: ['tasks', 'list'] });
      
      // 3. 칸반 보드 (카테고리 목록) 무효화
      queryClient.invalidateQueries({
        queryKey: [CategoryQueryKeys.CATEGORY_LIST],
        predicate: (query) => {
          // 카테고리 목록 쿼리만 무효화
          return query.queryKey.includes(CategoryQueryKeys.CATEGORY_LIST);
        }
      });
    },
    onError: (error) => {
      console.error('업무 삭제 실패:', error);
    },
  });
}; 