import { useMutation, useQueryClient } from '@tanstack/react-query';
import { requestCardService } from '@/services/requestCardService';

export const useDeleteRequestCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestCardId: number) => requestCardService.delete(requestCardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requestCards'] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error) => {
      console.error('업무 요청 삭제 실패:', error);
    },
  });
}; 