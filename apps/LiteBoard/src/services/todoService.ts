import api from '@/lib/api/axios';
import { ApiResponse } from '@/types/api';
import { TodoListResponse, CreateTodoRequest, UpdateTodoRequest, ToggleTodosRequest } from '@/types/todo';

// TODO 서비스 객체
export const todoService = {
  /**
   * Task에 속한 TODO 목록 조회 API
   * @param taskId - 업무 ID
   * @returns TODO 목록
   */
  getListByTask: async (taskId: number): Promise<TodoListResponse[]> => {
    const response = await api.get<ApiResponse<TodoListResponse[]>>(`/api/v1/tasks/${taskId}/todos`);
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'TODO 목록 조회에 실패했습니다.');
    }
    
    return response.data.result;
  },

  /**
   * TODO 생성 API
   * @param taskId - 업무 ID
   * @param todoData - 생성할 TODO 데이터
   * @returns 생성된 TODO 정보
   */
  create: async (taskId: number, todoData: CreateTodoRequest): Promise<TodoListResponse> => {
    const response = await api.post<ApiResponse<TodoListResponse>>(`/api/v1/tasks/${taskId}/todos`, todoData);
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'TODO 생성에 실패했습니다.');
    }
    
    return response.data.result;
  },

  /**
   * TODO 삭제 API
   * @param todoId - TODO ID
   */
  delete: async (todoId: number): Promise<void> => {
    const response = await api.delete<ApiResponse<void>>(`/api/v1/todos/${todoId}`);
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'TODO 삭제에 실패했습니다.');
    }
  },

  /**
   * TODO 수정 API
   * @param todoId - TODO ID
   * @param todoData - 수정할 TODO 데이터
   * @returns 수정된 TODO 정보
   */
  update: async (todoId: number, todoData: UpdateTodoRequest): Promise<TodoListResponse> => {
    const response = await api.patch<ApiResponse<TodoListResponse>>(`/api/v1/todos/${todoId}`, todoData);
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'TODO 수정에 실패했습니다.');
    }
    
    return response.data.result;
  },

  /**
   * 여러 TODO 완료 상태 토글 API
   * @param todoIds - 토글할 TODO ID 배열
   * @returns 토글된 TODO 목록
   */
  toggleTodos: async (todoIds: number[]): Promise<TodoListResponse[]> => {
    const requestData: ToggleTodosRequest = { todoIds };
    
    const response = await api.patch<ApiResponse<TodoListResponse[]>>('/api/v1/todos/toggle', requestData);
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'TODO 토글에 실패했습니다.');
    }
    
    return response.data.result;
  },
} as const; 