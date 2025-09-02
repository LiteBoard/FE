import { Member } from './common';

//  TODO: pr 머지 후 task 타입 Omit 사용해서 수정
export interface TaskData {
  id: number;
  title: string;
  status: string;
  members: Member[];
  startDate: string;
  endDate: string;
  completedTodoCount: number;
  pendingTodoCount: number;
}

export interface CategoryListResponse {
  id: number;
  title: string;
  tasks: TaskData[];
}
