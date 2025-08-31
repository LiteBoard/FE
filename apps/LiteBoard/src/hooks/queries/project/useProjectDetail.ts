import { useQuery } from '@tanstack/react-query';
import { projectService } from '@/services/projectService';

// 프로젝트 상세 조회 훅
export const useProjectById = (projectId: number) => {
  return useQuery({
    queryKey: ['projects', 'detail', projectId],
    queryFn: () => projectService.getById(projectId),
    enabled: !!projectId,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10,   // 10분
  });
}; 