import { useQuery } from '@tanstack/react-query';
import { projectService } from '@/services/projectService';

// 프로젝트 목록 조회 훅
export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: projectService.getList,
  });
}; 