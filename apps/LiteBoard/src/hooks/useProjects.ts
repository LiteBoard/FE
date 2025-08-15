import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createProject, getProjects, Project, ProjectCreateResponse } from '@/services/projectService';

// 프로젝트 목록 조회 훅
export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10,   // 10분
  });
};

// 프로젝트 생성 훅
export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: (newProject: ProjectCreateResponse) => {
      const projectForList: Project = {
        id: newProject.id,
        title: newProject.title,
      };
      
      queryClient.setQueryData(['projects'], (old: Project[] | undefined) => {
        return old ? [...old, projectForList] : [projectForList];
      });
      
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: (error) => {
      console.error('프로젝트 생성 실패:', error);
    },
  });
}; 