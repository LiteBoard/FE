import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '@/services/taskService';
import { CreateTaskRequest } from '@/types/task';

// 업무 생성 훅
export const useCreateTask = (categoryId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskData: CreateTaskRequest) => taskService.create(categoryId, taskData),
    onSuccess: () => {
      // 카테고리별 업무 목록 무효화
      queryClient.invalidateQueries({ queryKey: ['tasks', 'list', categoryId] });
    },
    onError: (error) => {
      console.error('업무 생성 실패:', error);
    },
  });
}; 