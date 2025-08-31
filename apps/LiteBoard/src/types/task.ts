import { Member, TaskStatus, Todo, RequestCard } from './common';

// 업무 담당자 배정 요청 인터페이스
export interface AssignTaskMembersRequest {
  memberIds: number[];
}

// 업무 생성 요청 인터페이스
export interface CreateTaskRequest {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

// 업무 수정 요청 인터페이스
export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  status?: TaskStatus;
  startDate?: string;
  endDate?: string;
}

// 업무 목록 조회 응답 인터페이스 (단건 조회에도 사용)
export interface TaskListResponse {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  startDate: string;
  endDate: string;
  members: Member[];
  completedTodoCount: number;
  pendingTodoCount: number;
  todos: Todo[];
  requestCards: RequestCard[];
} 