import { useMutation, useQueryClient } from '@tanstack/react-query';
import { requestCardService } from '@/services/requestCardService';
import { UpdateRequestCardRequest } from '@/types/request';

export const useUpdateRequestCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ requestCardId, requestData }: { requestCardId: number; requestData: UpdateRequestCardRequest }) =>
      requestCardService.update(requestCardId, requestData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requestCards'] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error) => {
      console.error('업무 요청 수정 실패:', error);
    },
  });
}; 