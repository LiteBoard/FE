import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoService } from '@/services/todoService';
import { TodoListResponse } from '@/types/todo';

// 여러 TODO 완료 상태 토글 훅
export const useToggleTodos = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todoIds: number[]) => todoService.toggleTodos(todoIds),
    onSuccess: (updatedTodos) => {
      // TODO 목록에서 해당 TODO들 업데이트 (optimistic update)
      queryClient.setQueriesData(
        { queryKey: ['todos', 'list'] },
        (oldData: TodoListResponse[] | undefined) => {
          if (!oldData) return oldData;
          
          // 업데이트된 TODO들의 맵 생성
          const updatedTodosMap = new Map(
            updatedTodos.map(todo => [todo.id, todo])
          );
          
          return oldData.map((todo) => 
            updatedTodosMap.has(todo.id) ? updatedTodosMap.get(todo.id)! : todo
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
      console.error('TODO 토글 실패:', error);
    },
  });
}; 