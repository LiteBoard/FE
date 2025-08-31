import { useQuery } from '@tanstack/react-query';
import { projectService } from '@/services/projectService';

// 내 업무 조회 훅
export const useMyTasks = (projectId: number | null) => {
  return useQuery({
    queryKey: ['my-tasks', projectId],
    queryFn: () => projectService.getMyTasks(projectId!),
    enabled: !!projectId,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10,   // 10분
  });
}; 