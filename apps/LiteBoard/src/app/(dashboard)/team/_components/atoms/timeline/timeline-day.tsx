import { isSaturday, isSunday, isToday } from 'date-fns';
import { format } from 'date-fns';
import { cn } from '@utils/cn';
import { DAY_WIDTH_PX } from '../../consts/timeline';

const TimelineDay = ({ days }: { days: Date[] }) => {
  return (
    <div
      className="grid sticky top-[47px] border-b border-neutral-200"
      style={{
        gridTemplateColumns: `repeat(${days.length}, ${DAY_WIDTH_PX}px)`,
        height: '46px',
      }}
    >
      {days.map((day, index) => {
        const isSat = isSaturday(day);
        const isSun = isSunday(day);
        const isNow = isToday(day);

        return (
          <div
            key={index}
            className="relative flex justify-center items-center h-[46px] select-none"
          >
            <span
              className={cn('w-5 text-center text-text-B3M text-neutral-600', {
                'text-blue-400': isSat,
                'text-red-400': isSun,
                'bg-red-500 text-neutral-white rounded-[6px]': isNow,
              })}
            >
              {format(day, 'd')}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TimelineDay;
