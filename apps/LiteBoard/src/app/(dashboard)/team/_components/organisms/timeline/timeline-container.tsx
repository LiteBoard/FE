'use client';
import TimelineBoard from '../../molecules/timeline/timeline-board';
import { useGenerateDays } from '../../hooks/useGenerateDays';
import { TaskStatus } from '../../consts/categoryTaskColorMap';

// 태스크 더미 데이터
const tasks = [
  {
    id: '1',
    name: '프로젝트 기획',
    startDate: '2025-08-01T00:00:00.000Z',
    endDate: '2025-08-05T23:59:59.999Z',
    status: 'PENDING' as TaskStatus,
    progress: '1/4',
  },
  {
    id: '2',
    name: '디자인 작업',
    startDate: '2025-08-04T00:00:00.000Z',
    endDate: '2025-08-12T23:59:59.999Z',
    status: 'IN_PROGRESS' as TaskStatus,
    progress: '4/4',
  },
  {
    id: '3',
    name: '개발 작업',
    startDate: '2025-08-10T00:00:00.000Z',
    endDate: '2025-08-18T23:59:59.999Z',
    status: 'DELAYED' as TaskStatus,
    progress: '2/4',
  },
  {
    id: '4',
    name: '테스트 및 배포',
    startDate: '2025-08-16T00:00:00.000Z',
    endDate: '2025-08-21T23:59:59.999Z',
    status: 'COMPLETED' as TaskStatus,
    progress: '1/4',
  },
];

const TimelineContainer = () => {
  const days = useGenerateDays();

  return <TimelineBoard days={days} tasks={tasks} />;
};

export default TimelineContainer;
