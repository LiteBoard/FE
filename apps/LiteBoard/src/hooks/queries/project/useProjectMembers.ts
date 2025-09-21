import { useQuery } from '@tanstack/react-query';
import { projectService } from '@/services/projectService';

// 프로젝트 멤버 조회 훅
export const useProjectMembers = (projectId: number) => {
  return useQuery({
    queryKey: ['projects', projectId, 'members'],
    queryFn: () => projectService.getMembers(projectId),
    enabled: !!projectId,
  });
};