import { useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryService } from '@/services/categoryService';
import { CategoryQueryKeys } from '@/constants/query-keys';

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, title }: { projectId: number; title: string }) =>
      categoryService.create(projectId, title),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CategoryQueryKeys.CATEGORY_LIST],
      });
    },
    onError: (error) => {
      console.error('카테고리 생성 실패:', error);
    },
  });
};
