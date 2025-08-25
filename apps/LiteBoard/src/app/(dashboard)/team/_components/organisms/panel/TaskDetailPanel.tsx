'use client';

import React from 'react';
import { Panel } from '@LiteBoard/ui';
import { useTaskDetailStore } from '../../stores/useTaskDetailStore';
import { TaskStatus } from '../../consts/categoryTaskColorMap';
import { TaskDetailData } from '../../types/panel';
import TaskHeader from '../../molecules/panel/TaskHeader';
import TaskDetailContent from './TaskDetailContent';

const TaskDetailPanel = () => {
  const { isOpen, selectedTask, closePanel } = useTaskDetailStore();

  if (!selectedTask) return null;

  const taskStatus: TaskStatus = 'IN_PROGRESS';

  const mockData: TaskDetailData = {
    assignee: {
      id: 1,
      nickname: 'Kang',
      profileUrl: '',
    },
    schedule: {
      startDate: '7월 2일',
      endDate: '7월 4일',
    },
    progress: {
      current: 1,
      total: 4,
    },
    todos: [
      {
        id: 1,
        description: '디자인 시스템 구축',
        isRequired: true,
        assignee: {
          id: 1,
          nickname: 'K',
          profileUrl: '',
        },
        checked: false,
      },
      {
        id: 2,
        description: 'API 연동 작업',
        isRequired: false,
        assignee: {
          id: 2,
          nickname: 'J',
          profileUrl: '',
        },
        checked: true,
      },
    ],
    receivedRequests: [],
    workRequest: {
      placeholder: '어떤 요청인가요?',
      todoLabel: 'Todo를 입력해 보세요.',
    },
  };

  return (
    <Panel isOpen={isOpen} onClose={closePanel} height="fixed">
      <div className="flex flex-col h-full">
        <TaskHeader 
          status={taskStatus}
          title="테스크 타이틀"
        />
        <TaskDetailContent 
          assignee={mockData.assignee}
          schedule={mockData.schedule}
          progress={mockData.progress}
          todos={mockData.todos}
          receivedRequests={mockData.receivedRequests}
          workRequest={mockData.workRequest}
        />
      </div>
    </Panel>
  );
};

export default TaskDetailPanel; 