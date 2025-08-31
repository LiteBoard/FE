import { useQuery } from '@tanstack/react-query';
import { taskService } from '@/services/taskService';

// 카테고리별 업무 목록 조회 훅
export const useTaskList = (categoryId: number) => {
  return useQuery({
    queryKey: ['tasks', 'list', categoryId],
    queryFn: () => taskService.getList(categoryId),
    enabled: !!categoryId,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10,   // 10분
  });
}; 