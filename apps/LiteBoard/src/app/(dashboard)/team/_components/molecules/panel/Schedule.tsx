import React from 'react';
import { Button, XBoldIcon, CalendarIcon } from '@LiteBoard/ui';
import { Schedule as ScheduleType } from '../../types/panel';

interface ScheduleProps {
  schedule: ScheduleType;
}

const Schedule = ({ schedule }: ScheduleProps) => {
  return (
    <div className="flex items-center gap-[78px]">
      <span className="text-text-B3M text-neutral-700">일정</span>
      <div className="flex items-center gap-3">
        <div className="w-[38px] h-[38px] bg-white border border-gray-300 rounded-full flex items-center justify-center">
          <CalendarIcon width={20} height={20} />
        </div>
        <span className="text-base font-medium text-gray-900">
          {schedule.startDate} - {schedule.endDate}
        </span>
        <Button variant="borderless" size="md">
          <XBoldIcon width={16} height={16} />
        </Button>
      </div>
    </div>
  );
};

export default Schedule; 