import { useMutation, useQueryClient } from '@tanstack/react-query';
import { requestCardService } from '@/services/requestCardService';
import { CreateRequestCardRequest } from '@/types/request';

// 업무 요청 생성 훅
export const useCreateRequestCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, requestData }: { taskId: number; requestData: CreateRequestCardRequest }) =>
      requestCardService.create(taskId, requestData),
    onSuccess: (_, { taskId }) => {
      queryClient.invalidateQueries({ queryKey: ['tasks', 'detail', taskId] });
      queryClient.invalidateQueries({ queryKey: ['requestCards', 'list', taskId] });
    },
    onError: (error) => {
      console.error('업무 요청 생성 실패:', error);
    },
  });
}; 