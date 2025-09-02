import api from '@/lib/api/axios';
import { ApiResponse } from '@/types/api';
import { CategoryListResponse } from '@/types/category';

// 카테고리 서비스 객체
export const categoryService = {
  /**
   * 카테고리 목록 조회 API
   * @param projectId - 프로젝트 ID
   * @returns 카테고리 목록
   */
  getList: async (projectId: number): Promise<CategoryListResponse[]> => {
    const response = await api.get<ApiResponse<CategoryListResponse[]>>(
      `/api/v1/projects/${projectId}/categories`
    );

    if (!response.data.success) {
      throw new Error(
        response.data.message || '카테고리 목록 조회에 실패했습니다.'
      );
    }

    return response.data.result;
  },

  /**
   * 카테고리 생성 API
   * @param projectId - 프로젝트 ID
   * @param title - 생성할 카테고리 제목
   * @returns 생성된 카테고리 정보
   */
  create: async (projectId: number, title: string): Promise<{ id: number }> => {
    const response = await api.post<ApiResponse<{ id: number }>>(
      `/api/v1/projects/${projectId}/categories`,
      { title }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || '카테고리 생성에 실패했습니다.');
    }

    return response.data.result;
  },

  /**
   * 카테고리 삭제 API
   * @param categoryId - 카테고리 ID
   */
  delete: async (categoryId: number): Promise<void> => {
    const response = await api.delete<ApiResponse<void>>(
      `/api/v1/categories/${categoryId}`
    );

    if (!response.data.success) {
      throw new Error(response.data.message || '카테고리 삭제에 실패했습니다.');
    }
  },

  /**
   * 카테고리 수정 API
   * @param categoryId - 카테고리 ID
   * @param title - 수정할 카테고리 제목
   * @returns 수정된 카테고리 정보
   */
  update: async (
    categoryId: number,
    title: string
  ): Promise<{ id: number }> => {
    const response = await api.patch<ApiResponse<{ id: number }>>(
      `/api/v1/categories/${categoryId}`,
      { title }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || '카테고리 수정에 실패했습니다.');
    }

    return response.data.result;
  },
} as const;
