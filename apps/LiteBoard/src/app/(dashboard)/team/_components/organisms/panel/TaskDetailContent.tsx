import React, { useState, useEffect, useCallback } from 'react';
import { Assignee, TodoList, RequestForm } from '../../molecules/panel';
import { TaskDetailData } from '../../types/panel';
import { DateRangePicker, Button, XBoldIcon, CalendarIcon, type DateRange } from '@LiteBoard/ui';
import { useTaskDetailStore } from '../../stores/useTaskDetailStore';

interface TaskDetailContentProps {
  assignee: TaskDetailData['assignee'];
  schedule: TaskDetailData['schedule'];
  progress: TaskDetailData['progress'];
  todos: TaskDetailData['todos'];
  receivedRequests: TaskDetailData['receivedRequests'];
  workRequest: TaskDetailData['workRequest'];
  taskId?: number;
  projectId?: number | null;
  onTodoChanges?: (changes: Map<number, boolean>) => void;
}

const TaskDetailContent = ({
  assignee,
  schedule,
  progress,
  todos,
  receivedRequests,
  workRequest,
  taskId,
  projectId,
  onTodoChanges,
}: TaskDetailContentProps) => {
  const { updateCurrentData } = useTaskDetailStore();

  const getInitialDateRange = useCallback((): DateRange | undefined => {
    if (schedule?.startDate && schedule?.endDate) {
      return {
        from: new Date(schedule.startDate),
        to: new Date(schedule.endDate)
      };
    }
    if (schedule?.startDate) {
      return {
        from: new Date(schedule.startDate),
        to: undefined
      };
    }
    return {
      from: new Date(),
      to: undefined
    };
  }, [schedule?.startDate, schedule?.endDate]);

  const [dateRange, setDateRange] = useState<DateRange | undefined>(getInitialDateRange());

  // schedule이 변경될 때마다 dateRange 업데이트
  useEffect(() => {
    setDateRange(getInitialDateRange());
  }, [getInitialDateRange]);

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);

    // store의 currentTaskData 업데이트
    if (range?.from) {
      const startDate = range.from.toISOString().split('T')[0]; // YYYY-MM-DD 형식
      const endDate = range.to ? range.to.toISOString().split('T')[0] : startDate;

      updateCurrentData({
        startDate,
        endDate
      });

      console.log('날짜 변경:', { startDate, endDate });
    }
  };

  const handleClearDate = () => {
    setDateRange(undefined);
  };

  return (
    <div className="flex h-full">
      {/* Left Column */}
      <div className="flex-1 p-[40px] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-neutral-100">
        <div className="space-y-[16px]">
          <Assignee assignee={assignee} projectId={projectId} taskId={taskId} />
          {/* Schedule with DateRangePicker */}
          <div className="flex items-center gap-[78px] flex-nowrap">
            <span className="text-text-B3M text-neutral-700 flex-shrink-0">일정</span>
            <div className="flex items-center gap-3 flex-shrink-0">
              <DateRangePicker
                value={dateRange}
                onChange={handleDateRangeChange}
                placeholder="기간을 선택하세요"
                renderTrigger={(value, formatRange, open, setOpen) => (
                  <div className="flex items-center gap-3 cursor-pointer" onClick={() => setOpen(!open)}>
                    <div className="w-[38px] h-[38px] bg-white border border-gray-300 rounded-full flex items-center justify-center">
                      <CalendarIcon width={20} height={20} />
                    </div>
                    <span className="text-base font-medium text-gray-900 hover:text-blue-500 transition-colors">
                      {formatRange()}
                    </span>
                  </div>
                )}
              />
              <Button variant="borderless" size="md" onClick={handleClearDate}>
                <XBoldIcon width={16} height={16} />
              </Button>
            </div>
          </div>
          <TodoList 
            progress={progress}
            todos={todos}
            taskId={taskId}
            onTodoChanges={onTodoChanges}
          />
        </div>
      </div>

      {/* Vertical Divider */}
      <div className="w-px bg-neutral-200 flex-shrink-0" />

      {/* Right Column*/}
      <div className="flex-1 p-[40px] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-neutral-100">
        <RequestForm
          receivedRequests={receivedRequests}
          workRequest={workRequest}
          taskId={taskId}
        />
      </div>
    </div>
  );
};

export default TaskDetailContent;