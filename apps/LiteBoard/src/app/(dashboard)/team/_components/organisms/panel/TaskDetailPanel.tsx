'use client';

import React, { useMemo } from 'react';
import { Panel } from '@LiteBoard/ui';
import TaskHeader from '../../molecules/panel/TaskHeader';
import TaskDetailContent from './TaskDetailContent';
import TaskDetailError from './components/TaskDetailError';
import { useTaskDetailPanel } from './hooks/useTaskDetailPanel';

const TaskDetailPanel = () => {
  const {
    isOpen,
    taskId,
    taskData,
    panelData,
    isLoading,
    error,
    todoChanges,
    handleTodoChanges,
    handleClosePanel,
  } = useTaskDetailPanel();

  // todo 변경사항을 반영한 실시간 데이터 계산
  const currentPanelData = useMemo(() => {
    if (!panelData) return null;

    // todo 변경사항을 반영한 실시간 업데이트
    const updatedTodos = panelData.todos.map(todo => ({
      ...todo,
      checked: todoChanges.has(todo.id) ? todoChanges.get(todo.id)! : todo.checked
    }));

    const completedCount = updatedTodos.filter(todo => todo.checked).length;

    return {
      ...panelData,
      todos: updatedTodos,
      progress: {
        current: completedCount,
        total: updatedTodos.length
      }
    };
  }, [panelData, todoChanges]);

  // 업무 삭제 성공 시 패널 닫기
  const handleDeleteSuccess = () => {
    handleClosePanel();
  };

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

  if (!taskData || !panelData || !currentPanelData) {
    return (
      <TaskDetailError
        isOpen={isOpen}
        onClose={handleClosePanel}
        type="not-found"
      />
    );
  }

  return (
    <Panel isOpen={isOpen} onClose={handleClosePanel} height="full">
      <div className="flex flex-col h-full">
        <div className="flex-shrink-0">
        <TaskHeader 
          status={taskData.status}
          title={taskData.title}
            taskId={taskId!}
            onDeleteSuccess={handleDeleteSuccess}
        />
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-neutral-100">
        <TaskDetailContent 
            assignee={currentPanelData.assignee}
            schedule={currentPanelData.schedule}
            progress={currentPanelData.progress}
            todos={currentPanelData.todos}
            receivedRequests={currentPanelData.receivedRequests}
            workRequest={currentPanelData.workRequest}
          taskId={taskId}
          onTodoChanges={handleTodoChanges}
        />
        </div>
      </div>
    </Panel>
  );
};

export default TaskDetailPanel; 