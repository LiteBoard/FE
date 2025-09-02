import { useQuery } from '@tanstack/react-query';
import { todoService } from '@/services/todoService';

// Task에 속한 TODO 목록 조회 훅
export const useTodoList = (taskId: number) => {
  return useQuery({
    queryKey: ['todos', 'list', taskId],
    queryFn: () => todoService.getListByTask(taskId),
    enabled: !!taskId,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10,   // 10분
  });
}; 