import { isMonday } from 'date-fns';
import { format } from 'date-fns';
import { DAY_WIDTH_PX } from '../../consts/timeline';

const TimelineMonth = ({ days }: { days: Date[] }) => {
  return (
    <div
      className="grid sticky top-0 z-10 border-b border-gray-200"
      style={{
        gridTemplateColumns: `repeat(${days.length}, ${DAY_WIDTH_PX}px)`,
        height: '46px',
      }}
    >
      {days.map((day, index) => {
        const isMon = isMonday(day);
        return (
          <div
            key={index}
            className="flex justify-center items-center text-neutral-600"
          >
            {isMon && (
              <span className="text-text-B3M">{format(day, 'M')}월</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TimelineMonth;
