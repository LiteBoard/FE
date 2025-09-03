import { useQuery } from '@tanstack/react-query';
import { categoryService } from '@/services/categoryService';
import { CategoryQueryKeys } from '@/constants/query-keys';

export const useGetCategoryList = ({
  projectId,
  enabled,
}: {
  projectId: number;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: [CategoryQueryKeys.CATEGORY_LIST, projectId],
    queryFn: () => categoryService.getList(projectId),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    enabled,
  });
};
