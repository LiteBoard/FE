import api from '@/lib/api/axios';
import { ApiResponse } from '@/types/api';

// 프로젝트 생성 요청 인터페이스
export interface CreateProjectRequest {
  title: string;
  startDate: string; // YYYY-MM-DD 형식
  endDate: string;   // YYYY-MM-DD 형식
}

// 프로젝트 응답 인터페이스 (조회 API용)
export interface Project {
  id: number;
  title: string;
}

// 프로젝트 생성 응답 인터페이스 (생성 API용)
export interface ProjectCreateResponse {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

// 프로젝트 생성 API 함수
export const createProject = async (projectData: CreateProjectRequest): Promise<ProjectCreateResponse> => {
  const response = await api.post<ApiResponse<ProjectCreateResponse>>('/api/v1/projects', projectData);
  
  if (!response.data.success) {
    throw new Error(response.data.message || '프로젝트 생성에 실패했습니다.');
  }
  
  return response.data.result;
};

// 프로젝트 목록 조회 API 함수 
export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get<ApiResponse<Project[]>>('/api/v1/projects');
  
  if (!response.data.success) {
    throw new Error(response.data.message || '프로젝트 목록 조회에 실패했습니다.');
  }
  
  return response.data.result;
};

// 프로젝트 상세 조회 API 함수 (추후 사용을 위해 추가)
export const getProject = async (projectId: number): Promise<ProjectCreateResponse> => {
  const response = await api.get<ApiResponse<ProjectCreateResponse>>(`/api/v1/projects/${projectId}`);
  
  if (!response.data.success) {
    throw new Error(response.data.message || '프로젝트 조회에 실패했습니다.');
  }
  
  return response.data.result;
}; 