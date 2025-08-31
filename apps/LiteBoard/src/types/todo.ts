import { Member } from './common';

// TODO 목록 조회 응답 인터페이스
export interface TodoListResponse {
  id: number;
  member: Member;
  description: string;
  done: boolean;
  isRequired: boolean;
}

// TODO 생성 요청 인터페이스
export interface CreateTodoRequest {
  description: string;
  memberId: number;
}

// TODO 수정 요청 인터페이스
export interface UpdateTodoRequest {
  description?: string;
  memberId?: number;
}

// TODO 토글 요청 인터페이스
export interface ToggleTodosRequest {
  todoIds: number[];
} 