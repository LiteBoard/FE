import { TaskStatus } from '../types';
import { Task } from '@/types/api';

/**
 * 태스크 상태를 UI에 맞는 상태로 매핑하는 함수
 * @param status - 서버에서 받은 태스크 상태
 * @param daysLeft - 남은 일수
 * @returns UI에서 사용할 태스크 상태
 */
export const getTaskStatus = (status: string, daysLeft: number): TaskStatus => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'finished';
    case 'overdue':
      return 'delayed';
    case 'today':
      return 'latest';
    default:
      return daysLeft <= 1 ? 'latest' : 'notLatest';
  }
};

/**
 * 태스크 데이터를 TodoCard에 맞는 형태로 변환하는 함수
 * @param task - 서버에서 받은 태스크 데이터
 * @returns TodoCard에서 사용할 수 있는 형태로 변환된 데이터
 */
export const transformTaskForTodoCard = (task: Task) => {
  const status = getTaskStatus(task.status, task.daysLeft);
  
  const todos = task.todos.map((todo) => ({
    id: todo.id.toString(),
    text: todo.description,
    checked: todo.done,
    assignee: todo.member.nickname,
    requested: todo.isRequired,
  }));

  return {
    status,
    title: task.title,
    todos,
    taskId: task.taskId,
  };
}; 