import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoService } from '@/services/todoService';
import { CreateTodoRequest } from '@/types/todo';

// TODO 생성 훅
export const useCreateTodo = (taskId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todoData: CreateTodoRequest) => todoService.create(taskId, todoData),
    onSuccess: () => {
      // TODO 목록 무효화
      queryClient.invalidateQueries({ queryKey: ['todos', 'list', taskId] });
      
      // 관련된 업무 상세 정보도 무효화 (TODO 정보가 포함되어 있으므로)
      queryClient.invalidateQueries({ queryKey: ['tasks', 'detail', taskId] });
      
      // 관련된 모든 업무 목록 무효화 (카테고리별)
      queryClient.invalidateQueries({ queryKey: ['tasks', 'list'] });
    },
    onError: (error) => {
      console.error('TODO 생성 실패:', error);
    },
  });
}; 