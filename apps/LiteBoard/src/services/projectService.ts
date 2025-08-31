import api from '@/lib/api/axios';
import { ApiResponse } from '@/types/api';
import {
  CreateProjectRequest,
  Project,
  ProjectCreateResponse,
  MyTasksResponse,
} from '@/types/project';

// 프로젝트 서비스 객체
export const projectService = {
  /**
   * 프로젝트 생성 API
   * @param projectData - 생성할 프로젝트 데이터
   * @returns 생성된 프로젝트 정보
   */
  create: async (projectData: CreateProjectRequest): Promise<ProjectCreateResponse> => {
    const response = await api.post<ApiResponse<ProjectCreateResponse>>('/api/v1/projects', projectData);
    
    if (!response.data.success) {
      throw new Error(response.data.message || '프로젝트 생성에 실패했습니다.');
    }
    
    return response.data.result;
  },

  /**
   * 프로젝트 목록 조회 API
   * @returns 프로젝트 목록
   */
  getList: async (): Promise<Project[]> => {
    const response = await api.get<ApiResponse<Project[]>>('/api/v1/projects');
    
    if (!response.data.success) {
      throw new Error(response.data.message || '프로젝트 목록 조회에 실패했습니다.');
    }
    
    return response.data.result;
  },

  /**
   * 프로젝트 상세 조회 API
   * @param projectId - 조회할 프로젝트 ID
   * @returns 프로젝트 상세 정보
   */
  getById: async (projectId: number): Promise<ProjectCreateResponse> => {
    const response = await api.get<ApiResponse<ProjectCreateResponse>>(`/api/v1/projects/${projectId}`);
    
    if (!response.data.success) {
      throw new Error(response.data.message || '프로젝트 조회에 실패했습니다.');
    }
    
    return response.data.result;
  },

  /**
   * 내 업무 조회 API
   * @param projectId - 프로젝트 ID
   * @returns 내 업무 정보
   */
  getMyTasks: async (projectId: number): Promise<MyTasksResponse> => {
    const response = await api.get<ApiResponse<MyTasksResponse>>(`/api/v1/projects/${projectId}/tasks`);
    
    if (!response.data.success) {
      throw new Error(response.data.message || '내 업무 조회에 실패했습니다.');
    }
    
    return response.data.result;
  },
} as const; 