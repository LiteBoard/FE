import React, { useState } from 'react';
import { Assignee, TodoList, RequestForm } from '../../molecules/panel';
import { TaskDetailData } from '../../types/panel';
import { DateRangePicker, Button, XBoldIcon, CalendarIcon, type DateRange } from '@LiteBoard/ui';

interface TaskDetailContentProps {
  assignee: TaskDetailData['assignee'];
  schedule: TaskDetailData['schedule'];
  progress: TaskDetailData['progress'];
  todos: TaskDetailData['todos'];
  receivedRequests: TaskDetailData['receivedRequests'];
  workRequest: TaskDetailData['workRequest'];
  taskId?: number; // 태스크 ID 추가
  onTodoChanges?: (changes: Map<number, boolean>) => void; // 투두 변경사항 핸들러
}

const TaskDetailContent = ({
  assignee,
  progress,
  todos,
  receivedRequests,
  workRequest,
  taskId,
  onTodoChanges,
}: TaskDetailContentProps) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: undefined
  });

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    console.log('선택된 기간:', range);
  };

  const handleClearDate = () => {
    setDateRange(undefined);
  };

  return (
    <div className="flex h-full">
      {/* Left Column */}
      <div className="flex-1 p-[40px] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-neutral-100">
        <div className="space-y-[16px]">
          <Assignee assignee={assignee} />
          {/* Schedule with DateRangePicker */}
          <div className="flex items-center gap-[50px]">
            <span className="text-text-B3M text-neutral-700">일정</span>
            <div className="flex items-center gap-3">
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