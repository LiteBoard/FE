// 공통으로 사용되는 타입들

// 멤버 정보
export interface Member {
  id: number;
  nickname: string;
  profileUrl: string;
}

// 업무 상태
export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'DELAYED';

// Todo 정보
export interface Todo {
  id: number;
  member: Member;
  description: string;
  done: boolean;
  isRequired: boolean;
} 