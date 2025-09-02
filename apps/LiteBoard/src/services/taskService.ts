import api from '@/lib/api/axios';
import { ApiResponse } from '@/types/api';
import {
  AssignTaskMembersRequest,
  CreateTaskRequest,
  UpdateTaskRequest,
  TaskListResponse,
} from '@/types/task';

// 업무 서비스 객체
export const taskService = {
  /**
   * 업무 목록 조회 API
   * @param categoryId - 카테고리 ID
   * @returns 업무 목록
   */
  getList: async (categoryId: number): Promise<TaskListResponse[]> => {
    const response = await api.get<ApiResponse<TaskListResponse[]>>(`/api/v1/categories/${categoryId}/tasks`);
    
    if (!response.data.success) {
      throw new Error(response.data.message || '업무 목록 조회에 실패했습니다.');
    }
    
    return response.data.result;
  },

  /**
   * 업무 생성 API
   * @param categoryId - 카테고리 ID
   * @param taskData - 생성할 업무 데이터
   * @returns 생성된 업무 정보
   */
  create: async (categoryId: number, taskData: CreateTaskRequest): Promise<TaskListResponse> => {
    const response = await api.post<ApiResponse<TaskListResponse>>(`/api/v1/categories/${categoryId}/tasks`, taskData);
    
    if (!response.data.success) {
      throw new Error(response.data.message || '업무 생성에 실패했습니다.');
    }
    
    return response.data.result;
  },

  /**
   * 업무 단건 조회 API
   * @param taskId - 업무 ID
   * @returns 업무 상세 정보
   */
  getById: async (taskId: number): Promise<TaskListResponse> => {
    const response = await api.get<ApiResponse<TaskListResponse>>(`/api/v1/tasks/${taskId}`);
    
    if (!response.data.success) {
      throw new Error(response.data.message || '업무 조회에 실패했습니다.');
    }
    
    return response.data.result;
  },

  /**
   * 업무 삭제 API
   * @param taskId - 업무 ID
   */
  delete: async (taskId: number): Promise<void> => {
    const response = await api.delete<ApiResponse<void>>(`/api/v1/tasks/${taskId}`);
    
    if (!response.data.success) {
      throw new Error(response.data.message || '업무 삭제에 실패했습니다.');
    }
  },

  /**
   * 업무 수정 API
   * @param taskId - 업무 ID
   * @param taskData - 수정할 업무 데이터
   * @returns 수정된 업무 정보
   */
  update: async (taskId: number, taskData: UpdateTaskRequest): Promise<TaskListResponse> => {
    const response = await api.patch<ApiResponse<TaskListResponse>>(`/api/v1/tasks/${taskId}`, taskData);
    
    if (!response.data.success) {
      throw new Error(response.data.message || '업무 수정에 실패했습니다.');
    }
    
    return response.data.result;
  },

  /**
   * 업무 담당자 배정 API
   * @param taskId - 업무 ID
   * @param memberIds - 배정할 멤버 ID 배열
   */
  assignMembers: async (taskId: number, memberIds: number[]): Promise<void> => {
    const requestData: AssignTaskMembersRequest = { memberIds };
    
    const response = await api.post<ApiResponse<void>>(`/api/v1/tasks/${taskId}/members`, requestData);
    
    if (!response.data.success) {
      throw new Error(response.data.message || '업무 담당자 배정에 실패했습니다.');
    }
  },

  /**
   * 업무 담당자 제거 API
   * @param taskId - 업무 ID
   * @param memberId - 제거할 멤버 ID
   */
  removeMember: async (taskId: number, memberId: number): Promise<void> => {
    const response = await api.delete<ApiResponse<void>>(`/api/v1/tasks/${taskId}/members/${memberId}`);
    
    if (!response.data.success) {
      throw new Error(response.data.message || '업무 담당자 제거에 실패했습니다.');
    }
  },

} as const;
