'use client';

import React from 'react';
import { Panel } from '@LiteBoard/ui';
import TaskHeader from '../../molecules/panel/TaskHeader';
import TaskDetailContent from './TaskDetailContent';
import TaskDetailError from './components/TaskDetailError';
import { useTaskDetailPanel } from './hooks/useTaskDetailPanel';
import { transformTaskDataToPanelData } from './utils/taskDataTransformer';

const TaskDetailPanel = () => {
  const {
    isOpen,
    taskId,
    taskData,
    isLoading,
    error,
    handleTodoChanges,
    handleClosePanel,
  } = useTaskDetailPanel();

  // 패널이 닫혀있으면 렌더링하지 않음
  if (!isOpen) return null;

  // 로딩, 에러, 데이터 없음 상태 처리
  if (isLoading) {
    return (
      <TaskDetailError
        isOpen={isOpen}
        onClose={handleClosePanel}
        type="loading"
      />
    );
  }

  if (error) {
    return (
      <TaskDetailError
        isOpen={isOpen}
        onClose={handleClosePanel}
        type="error"
        error={error}
      />
    );
  }

  if (!taskData) {
    return (
      <TaskDetailError
        isOpen={isOpen}
        onClose={handleClosePanel}
        type="not-found"
      />
    );
  }

  // API 데이터를 UI 데이터로 변환
  const panelData = transformTaskDataToPanelData(taskData);

  return (
    <Panel isOpen={isOpen} onClose={handleClosePanel} height="fixed">
      <div className="flex flex-col h-full">
        <TaskHeader 
          status={taskData.status}
          title={taskData.title}
        />
        <TaskDetailContent 
          assignee={panelData.assignee}
          schedule={panelData.schedule}
          progress={panelData.progress}
          todos={panelData.todos}
          receivedRequests={panelData.receivedRequests}
          workRequest={panelData.workRequest}
          taskId={taskId}
          onTodoChanges={handleTodoChanges}
        />
      </div>
    </Panel>
  );
};

export default TaskDetailPanel; 