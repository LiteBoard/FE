import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api/axios';
import { ApiResponse, TasksResponse } from '@/types/api';

// 프로젝트별 업무조회 API 호출 함수
const fetchTasks = async (projectId: number): Promise<TasksResponse> => {
  const response = await api.get<ApiResponse<TasksResponse>>(`/api/v1/projects/${projectId}/tasks`);
  
  if (!response.data.success) {
    throw new Error(response.data.message || '업무 조회에 실패했습니다.');
  }
  
  return response.data.result;
};

// 프로젝트별 업무조회 React Query 훅
export const useTasks = (projectId: number | null) => {
  return useQuery({
    queryKey: ['tasks', projectId],
    queryFn: () => fetchTasks(projectId!),
    enabled: !!projectId, // projectId가 있을 때만 쿼리 실행
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}; 