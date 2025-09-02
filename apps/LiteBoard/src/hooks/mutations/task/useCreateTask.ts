import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '@/services/taskService';
import { CreateTaskRequest } from '@/types/task';
import { CategoryQueryKeys } from '@/constants/query-keys';

// 업무 생성 훅
export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      categoryId,
      taskData,
    }: {
      categoryId: number;
      taskData: CreateTaskRequest;
    }) => taskService.create(categoryId, taskData),
    onSuccess: (_, { categoryId }) => {
      // 카테고리별 업무 목록 무효화
      queryClient.invalidateQueries({
        queryKey: ['tasks', 'list', categoryId],
      });

      //카테고리 목록 무효화
      queryClient.invalidateQueries({
        queryKey: [CategoryQueryKeys.CATEGORY_LIST],
      });
    },
    onError: (error) => {
      console.error('업무 생성 실패:', error);
    },
  });
};
