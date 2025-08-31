'use client';

import React, { useState } from 'react';
import { Panel } from '@LiteBoard/ui';
import { useTaskDetailStore } from '../../stores/useTaskDetailStore';
import { TaskDetailData } from '../../types/panel';
import TaskHeader from '../../molecules/panel/TaskHeader';
import TaskDetailContent from './TaskDetailContent';
import { useTaskById } from '@/hooks/queries/task/useTaskById';
import { useToggleTodos } from '@/hooks/mutations/todo/useToggleTodos';
import { TaskListResponse } from '@/types/task';

const TaskDetailPanel = () => {
  const { isOpen, closePanel } = useTaskDetailStore();
  const [todoChanges, setTodoChanges] = useState<Map<number, boolean>>(new Map());

  // 임시로 ID 1의 태스크 상세 데이터 조회
  const taskId = 1;
  const { data: taskData, isLoading, error } = useTaskById(taskId);
  const toggleTodosMutation = useToggleTodos();

  // 투두 변경사항 핸들러
  const handleTodoChanges = (changes: Map<number, boolean>) => {
    setTodoChanges(changes);
  };

  // 패널 닫기 핸들러 (변경사항 처리 포함)
  const handleClosePanel = async () => {
    // 변경사항이 있으면 처리
    if (todoChanges.size > 0) {
      try {
        const todoIds = Array.from(todoChanges.keys());
        await toggleTodosMutation.mutateAsync(todoIds);
        console.log('투두 변경사항 저장 완료:', todoIds);
      } catch (error) {
        console.error('투두 변경사항 저장 실패:', error);
      }
    }
    
    // 변경사항 초기화
    setTodoChanges(new Map());
    
    // 패널 닫기
    closePanel();
  };

  // 패널이 열려있을 때만 데이터 조회
  if (!isOpen) return null;

  // 로딩 중일 때
  if (isLoading) {
    return (
      <Panel isOpen={isOpen} onClose={handleClosePanel} height="fixed">
        <div className="flex flex-col h-full">
          <div className="p-6">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </Panel>
    );
  }

  // 에러가 있을 때
  if (error) {
    return (
      <Panel isOpen={isOpen} onClose={handleClosePanel} height="fixed">
        <div className="flex flex-col h-full">
          <div className="p-6">
            <div className="text-red-500">
              <h3 className="text-lg font-semibold mb-2">업무 정보 로딩 실패</h3>
              <p>{error.message}</p>
            </div>
          </div>
        </div>
      </Panel>
    );
  }

  // 데이터가 없을 때
  if (!taskData) {
    return (
      <Panel isOpen={isOpen} onClose={handleClosePanel} height="fixed">
        <div className="flex flex-col h-full">
          <div className="p-6">
            <div className="text-gray-500">
              <h3 className="text-lg font-semibold mb-2">업무 정보를 찾을 수 없습니다</h3>
            </div>
          </div>
        </div>
      </Panel>
    );
  }

  // API 데이터를 패널 데이터로 변환하는 함수
  const transformTaskDataToPanelData = (task: TaskListResponse): TaskDetailData => {
    return {
      assignee: task.members.length > 0 ? task.members[0]! : {
        id: 0,
        nickname: '담당자 없음',
        profileUrl: '',
      },
      schedule: {
        startDate: formatDate(task.startDate),
        endDate: formatDate(task.endDate),
      },
      progress: {
        current: task.completedTodoCount,
        total: task.completedTodoCount + task.pendingTodoCount,
      },
      todos: task.todos.map(todo => ({
        id: todo.id,
        description: todo.description,
        isRequired: todo.isRequired,
        assignee: todo.member,
        checked: todo.done,
      })),
      receivedRequests: [], // 임시로 빈 배열로 설정 (API 응답 구조가 다름)
      workRequest: {
        placeholder: '어떤 요청인가요?',
        todoLabel: 'Todo를 입력해 보세요.',
      },
    };
  };

  // 날짜 포맷 함수
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}월 ${day}일`;
  };

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