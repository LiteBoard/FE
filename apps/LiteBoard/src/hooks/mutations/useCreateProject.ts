import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectService, Project, ProjectCreateResponse } from '@/services/projectService';

// 프로젝트 생성 훅
export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: projectService.create,
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