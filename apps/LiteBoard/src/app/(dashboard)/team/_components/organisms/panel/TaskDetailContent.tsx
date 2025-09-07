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
    <div className="flex h-full">
      {/* Left Column */}
      <div className="flex-1 p-[40px] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-neutral-100">
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