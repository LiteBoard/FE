import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoService } from '@/services/todoService';
import { TodoListResponse } from '@/types/todo';

// TODO 삭제 훅
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todoId: number) => todoService.delete(todoId),
    onSuccess: (_, todoId) => {
      //(optimistic update)
      queryClient.setQueriesData(
        { queryKey: ['todos', 'list'] },
        (oldData: TodoListResponse[] | undefined) => {
          if (!oldData) return oldData;
          return oldData.filter((todo) => todo.id !== todoId);
        }
      );
      
      // 관련된 모든 TODO 목록 무효화
      queryClient.invalidateQueries({ queryKey: ['todos', 'list'] });
      
      // 관련된 모든 업무 상세 정보 무효화 (TODO 정보가 포함되어 있으므로)
      queryClient.invalidateQueries({ queryKey: ['tasks', 'detail'] });
      
      // 관련된 모든 업무 목록 무효화 (카테고리별)
      queryClient.invalidateQueries({ queryKey: ['tasks', 'list'] });
    },
    onError: (error) => {
      console.error('TODO 삭제 실패:', error);
    },
  });
}; 