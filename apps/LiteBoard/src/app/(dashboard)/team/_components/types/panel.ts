import { Member, Todo } from '@/types/common';

export type Assignee = Member;

export type Schedule = {
  startDate: string;
  endDate: string;
};

export type Progress = {
  current: number;
  total: number;
};

export type TodoItem = Omit<Todo, 'member' | 'done'> & {
  assignee: Assignee;
  checked: boolean;
};

export type WorkRequest = {
  placeholder: string;
  todoLabel: string;
};

export type ReceivedRequest = {
  id: string;
  title: string;
  description: string;
  requester: Assignee;
  createdAt: string;
  status: 'pending' | 'accepted' | 'rejected';
};

export type TaskDetailData = {
  assignee: Assignee;
  schedule: Schedule;
  progress: Progress;
  todos: TodoItem[];
  receivedRequests: ReceivedRequest[];
  workRequest: WorkRequest;
}; 