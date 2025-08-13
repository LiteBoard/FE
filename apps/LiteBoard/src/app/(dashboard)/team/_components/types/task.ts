import { TaskStatus } from '../consts/categoryTaskColorMap';

export type Task = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  progress: string;
  status: TaskStatus;
};
