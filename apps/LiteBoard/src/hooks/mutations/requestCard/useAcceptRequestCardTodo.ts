import { useMutation, useQueryClient } from '@tanstack/react-query';
import { requestCardService } from '@/services/requestCardService';

export const useAcceptRequestCardTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ requestCardId, requestCardTodoId }: { requestCardId: number; requestCardTodoId: number }) =>
      requestCardService.acceptTodo(requestCardId, requestCardTodoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requestCards'] });
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error) => {
      console.error('요청된 할 일 수락 실패:', error);
    },
  });
}; 