import { TaskListResponse } from '@/types/task';
import { TaskDetailData } from '../../../types/panel';

/**
 * API 응답 데이터를 패널 UI 데이터로 변환하는 유틸리티
 */
export const transformTaskDataToPanelData = (task: TaskListResponse): TaskDetailData => {
  return {
    assignee: task.members.length > 0 ? task.members[0]! : {
      id: 0,
      nickname: '담당자 없음',
      profileUrl: '',
    },
    schedule: {
      startDate: formatDate(task.startDate),
      endDate: formatDate(task.endDate),
    },
    progress: {
      current: task.completedTodoCount,
      total: task.completedTodoCount + task.pendingTodoCount,
    },
    todos: task.todos.map(todo => ({
      id: todo.id,
      description: todo.description,
      isRequired: todo.isRequired,
      assignee: todo.member,
      checked: todo.done,
    })),
    receivedRequests: [], // 임시로 빈 배열로 설정 (API 응답 구조가 다름)
    workRequest: {
      placeholder: '어떤 요청인가요?',
      todoLabel: 'Todo를 입력해 보세요.',
    },
  };
};

/**
 * 날짜 포맷 함수
 */
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}월 ${day}일`;
}; 