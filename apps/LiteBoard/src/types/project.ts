import { Member, Todo } from './common';

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

// 내 업무 조회 응답 인터페이스
export interface MyTasksResponse {
  myInfo: Member;
  projectName: string;
  totalTodoCount: number;
  completedTodoCount: number;
  pendingTodoCount: number;
  tasks: {
    taskId: number;
    title: string;
    totalTodoCount: number;
    completedTodoCount: number;
    daysLeft: number;
    status: string;
    todos: Todo[];
  }[];
} 