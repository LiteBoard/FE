import { transformDate } from '@/utils/transformDate';
import { START_DATE, END_DATE } from '../consts/timeline';
import { addDays } from 'date-fns';

export const useGenerateDays = () => {
  const days = [];

  let currentDate = transformDate(START_DATE);
  const endDate = transformDate(END_DATE);

  while (currentDate <= endDate) {
    days.push(new Date(currentDate));
    currentDate = addDays(currentDate, 1);
  }

  return days;
};
