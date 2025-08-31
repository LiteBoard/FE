import { Member } from './common';

// 요청 카드 정보
export interface RequestCard {
  id: number;
  content: string;
  sender: Member;
  todos: {
    id: number;
    description: string;
  }[];
}

// 업무 요청 생성 요청 인터페이스
export interface CreateRequestCardRequest {
  content: string;
  todoDescriptions: string[];
}

// 업무 요청 수정 요청 인터페이스
export interface UpdateRequestCardRequest {
  content: string;
  todoDescriptions: string[];
}

// 요청된 할 일 수락 요청 인터페이스
export interface AcceptRequestCardTodoRequest {
  requestCardId: number;
  requestCardTodoId: number;
} 