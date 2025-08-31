import { useQuery } from '@tanstack/react-query';
import { requestCardService } from '@/services/requestCardService';

interface UseRequestCardListOptions {
  enabled?: boolean;
}

export const useRequestCardList = (taskId: number, options?: UseRequestCardListOptions) => {
  return useQuery({
    queryKey: ['requestCards', 'list', taskId],
    queryFn: () => requestCardService.getList(taskId),
    enabled: options?.enabled !== undefined ? options.enabled && !!taskId : !!taskId,
  });
}; 