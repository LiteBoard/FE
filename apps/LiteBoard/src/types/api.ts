// 공통 API 응답 타입
export interface ApiResponse<T> {
  code: number;
  message: string;
  result: T;
  success: boolean;
}

// 사용자 정보 타입
export interface Member {
  id: number;
  nickname: string;
  profileUrl: string;
}

// 투두 타입
export interface Todo {
  id: number;
  member: Member;
  description: string;
  done: boolean;
  isRequired: boolean;
}

// 태스크 타입
export interface Task {
  taskId: number;
  title: string;
  totalTodoCount: number;
  completedTodoCount: number;
  daysLeft: number;
  status: string;
  todos: Todo[];
}

// 업무조회 응답 타입
export interface TasksResponse {
  myInfo: Member;
  totalTodoCount: number;
  completedTodoCount: number;
  pendingTodoCount: number;
  tasks: Task[];
} 