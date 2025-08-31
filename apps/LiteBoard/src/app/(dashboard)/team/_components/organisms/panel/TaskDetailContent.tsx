import React from 'react';
import { Assignee, Schedule, TodoList, RequestForm } from '../../molecules/panel';
import { TaskDetailData } from '../../types/panel';

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
  schedule,
  progress,
  todos,
  receivedRequests,
  workRequest,
  taskId,
  onTodoChanges,
}: TaskDetailContentProps) => {
  return (
    <div className="flex-1 p-[40px]">
      <div className="grid grid-cols-2 gap-[40px]">
        {/* Left Column */}
        <div className="space-y-[16px]">
          <Assignee assignee={assignee} />
          <Schedule schedule={schedule} />
          <TodoList 
            progress={progress}
            todos={todos}
            taskId={taskId}
            onTodoChanges={onTodoChanges}
          />
        </div>

        {/* Vertical Divider */}
        <div className="absolute left-1/2 top-[120px] bottom-0 w-px bg-neutral-200 transform -translate-x-1/2" />

        {/* Right Column */}
        <RequestForm 
          receivedRequests={receivedRequests}
          workRequest={workRequest}
        />
      </div>
    </div>
  );
};

export default TaskDetailContent; 