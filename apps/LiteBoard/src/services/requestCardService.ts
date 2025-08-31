import api from '@/lib/api/axios';
import { ApiResponse } from '@/types/api';
import { RequestCard, CreateRequestCardRequest, UpdateRequestCardRequest } from '@/types/request';

// 업무 요청 서비스 객체
export const requestCardService = {
  /**
   * 업무 요청 생성 API
   * @param taskId - 업무 ID
   * @param requestData - 요청 데이터
   */
  create: async (taskId: number, requestData: CreateRequestCardRequest): Promise<void> => {
    const response = await api.post<ApiResponse<void>>(`/api/v1/tasks/${taskId}/request-cards`, requestData);
    
    if (!response.data.success) {
      throw new Error(response.data.message || '업무 요청 생성에 실패했습니다.');
    }
  },

  getList: async (taskId: number): Promise<RequestCard[]> => {
    const response = await api.get<ApiResponse<RequestCard[]>>(`/api/v1/tasks/${taskId}/request-cards`);
    
    if (!response.data.success) {
      throw new Error(response.data.message || '업무 요청 조회에 실패했습니다.');
    }
    
    return response.data.result;
  },
  acceptTodo: async (requestCardId: number, requestCardTodoId: number): Promise<void> => {
    const response = await api.post<ApiResponse<void>>(
      `/api/v1/request-cards/${requestCardId}/todos/${requestCardTodoId}/accept`
    );

    if (!response.data.success) {
      throw new Error(response.data.message || '요청된 할 일 수락에 실패했습니다.');
    }
  },
  update: async (requestCardId: number, requestData: UpdateRequestCardRequest): Promise<void> => {
    const response = await api.patch<ApiResponse<void>>(`/api/v1/request-cards/${requestCardId}`, requestData);

    if (!response.data.success) {
      throw new Error(response.data.message || '업무 요청 수정에 실패했습니다.');
    }
  },
  delete: async (requestCardId: number): Promise<void> => {
    const response = await api.delete<ApiResponse<void>>(`/api/v1/request-cards/${requestCardId}`);

    if (!response.data.success) {
      throw new Error(response.data.message || '업무 요청 삭제에 실패했습니다.');
    }
  },
} as const; 