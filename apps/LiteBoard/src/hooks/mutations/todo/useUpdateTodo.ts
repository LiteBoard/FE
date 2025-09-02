import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoService } from '@/services/todoService';
import { UpdateTodoRequest, TodoListResponse } from '@/types/todo';

// TODO 수정 훅
export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ todoId, todoData }: { todoId: number; todoData: UpdateTodoRequest }) =>
      todoService.update(todoId, todoData),
    onSuccess: (updatedTodo, { todoId }) => {
      // (optimistic update)
      queryClient.setQueriesData(
        { queryKey: ['todos', 'list'] },
        (oldData: TodoListResponse[] | undefined) => {
          if (!oldData) return oldData;
          return oldData.map((todo) => 
            todo.id === todoId ? updatedTodo : todo
          );
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
      console.error('TODO 수정 실패:', error);
    },
  });
}; 