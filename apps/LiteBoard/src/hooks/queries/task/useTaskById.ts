import { useQuery } from '@tanstack/react-query';
import { taskService } from '@/services/taskService';

// 업무 단건 조회 훅
export const useTaskById = (taskId: number) => {
  return useQuery({
    queryKey: ['tasks', 'detail', taskId],
    queryFn: () => taskService.getById(taskId),
    enabled: !!taskId,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10,   // 10분
  });
}; 