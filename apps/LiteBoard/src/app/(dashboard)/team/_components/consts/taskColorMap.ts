// 태스크 상태별 색상 매핑
export const TASK_STATUS_STYLES = {
  PENDING: {
    bgColor: 'bg-neutral-100',
    borderColor: 'border-neutral-300',
    textColor: 'text-neutral-600',
  },
  COMPLETED: {
    bgColor: 'bg-blue-100',
    borderColor: 'border-blue-500',
    textColor: 'text-blue-500',
  },
  DELAYED: {
    bgColor: 'bg-red-100',
    borderColor: 'border-red-500',
    textColor: 'text-red-500',
  },
  IN_PROGRESS: {
    bgColor: 'bg-green-100',
    borderColor: 'border-green-500',
    textColor: 'text-green-700',
  },
} as const;

// 태스크 상태 타입
export type TaskStatus = keyof typeof TASK_STATUS_STYLES;
