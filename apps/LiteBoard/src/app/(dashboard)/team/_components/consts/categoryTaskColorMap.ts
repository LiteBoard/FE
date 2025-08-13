// 카테고리 박스 테스크 상태별 색상 매핑
export const CATEGORY_TASK_STATUS_STYLES = {
  PENDING: {
    bgColor: 'bg-coolGray-100',
    textColor: 'text-neutral-600',
  },
  COMPLETED: {
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-500',
  },
  DELAYED: {
    bgColor: 'bg-red-100',
    textColor: 'text-red-500',
  },
  IN_PROGRESS: {
    bgColor: 'bg-green-100',
    textColor: 'text-green-700',
  },
} as const;

// 카테고리 박스 테스크 상태 타입
export type TaskStatus = keyof typeof CATEGORY_TASK_STATUS_STYLES;
