import { TaskStatus } from '../consts/categoryTaskColorMap';

export const useTransformTaskStatus = (status: TaskStatus) => {
  switch (status) {
    case 'PENDING':
      return '대기중';
    case 'IN_PROGRESS':
      return '진행중';
    case 'DELAYED':
      return '지연됨';
    case 'COMPLETED':
      return '완료됨';
  }
};
