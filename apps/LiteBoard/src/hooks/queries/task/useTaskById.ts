import { useQuery } from '@tanstack/react-query';
import { taskService } from '@/services/taskService';

interface UseTaskByIdOptions {
  enabled?: boolean;
}

// 업무 단건 조회 훅
export const useTaskById = (taskId: number, options?: UseTaskByIdOptions) => {
  return useQuery({
    queryKey: ['tasks', 'detail', taskId],
    queryFn: () => taskService.getById(taskId),
    enabled: options?.enabled !== undefined ? options.enabled && !!taskId : !!taskId,
  });
}; 