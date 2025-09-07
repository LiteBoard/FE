import { useMutation, useQueryClient } from '@tanstack/react-query';
import { requestCardService } from '@/services/requestCardService';

export const useAcceptRequestCardTodo = (taskId?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ requestCardId, requestCardTodoId }: { requestCardId: number; requestCardTodoId: number }) =>
      requestCardService.acceptTodo(requestCardId, requestCardTodoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requestCards'] });
      
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      
      if (taskId) {
        queryClient.invalidateQueries({ queryKey: ['todos', 'list', taskId] });
      }
      if (taskId) {
        queryClient.invalidateQueries({ queryKey: ['tasks', 'detail', taskId] });
      }
    },
    onError: (error) => {
      console.error('요청된 할 일 수락 실패:', error);
    },
  });
}; 