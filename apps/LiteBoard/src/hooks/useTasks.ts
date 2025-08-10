import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api/axios';
import { ApiResponse, TasksResponse } from '@/types/api';

// 업무조회 API 호출 함수
const fetchTasks = async (): Promise<TasksResponse> => {
  const response = await api.get<ApiResponse<TasksResponse>>('/api/v1/tasks');
  
  if (!response.data.success) {
    throw new Error(response.data.message || '업무 조회에 실패했습니다.');
  }
  
  return response.data.result;
};

// 업무조회 React Query 훅
export const useTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
    staleTime: 1000 * 60 * 5, // 5분간 fresh
    gcTime: 1000 * 60 * 10, // 10분간 캐시 유지
  });
}; 