'use client';

import React from 'react';
import { Panel, Profile, Progress, Checkbox, Button, TextField, XBoldIcon, CalendarIcon, PlusIcon, HelpIcon, TrashIcon } from '@LiteBoard/ui';
import { useTaskDetailStore } from './stores/useTaskDetailStore';
import { cn } from '@/utils/cn';
import { CATEGORY_TASK_STATUS_STYLES, TaskStatus } from './consts/categoryTaskColorMap';
import { transformTaskStatus } from './hooks/transformTaskStatus';

const TaskDetailPanel = () => {
  const { isOpen, selectedTask, closePanel } = useTaskDetailStore();

  if (!selectedTask) return null;

  // 하드코딩으로 진행중 상태 설정
  const taskStatus: TaskStatus = 'IN_PROGRESS';

  return (
    <Panel isOpen={isOpen} onClose={closePanel} height="fixed">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-[40px] pt-[40px] border-neutral-200">
          <div className="flex flex-col gap-3">
            <div
              className={cn(
                'inline-flex whitespace-nowrap text-center h-6 px-[10px] rounded-full text-text-B3M w-[61px]',
                CATEGORY_TASK_STATUS_STYLES[taskStatus].textColor,
                CATEGORY_TASK_STATUS_STYLES[taskStatus].bgColor
              )}
            >
              {transformTaskStatus(taskStatus)}
            </div>
            <h1 className="text-3xl font-semibold text-gray-900">테스크 타이틀</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="borderless" size="md" className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-100">
              <TrashIcon width={24} height={24} />
              <span className="text-text-T3 text-neutral-600">업무 삭제</span>
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-[40px]">
          <div className="grid grid-cols-2 gap-[40px]">
            {/* Left Column */}
            <div className="space-y-[16px]">
              {/* 담당자 */}
              <div className="flex items-center gap-[64px]">
                <span className="text-text-B3M text-neutral-700">담당자</span>
                <div className="flex items-center gap-3">
                  <Profile name="Kang" size="lg" variant="skyBlue" />
                  <span className="text-text-B1M text-neutral-800">Kang</span>
                  <Button variant="borderless" size="md">
                    <XBoldIcon width={16} height={16} />
                  </Button>
                </div>
              </div>

              {/* 일정 */}
              <div className="flex items-center gap-[78px]">
                <span className="text-text-B3M text-neutral-700">일정</span>
                <div className="flex items-center gap-3">
                  <div className="w-[38px] h-[38px] bg-white border border-gray-300 rounded-full flex items-center justify-center">
                    <CalendarIcon width={20} height={20} />
                  </div>
                  <span className="text-base font-medium text-gray-900">7월 2일 - 7월 4일</span>
                  <Button variant="borderless" size="md">
                    <XBoldIcon width={16} height={16} />
                  </Button>
                </div>
              </div>

              {/* To-do */}
              <div className="space-y-[16px]">
                <div className="flex items-center gap-[63px]">
                  <span className="text-text-B3M text-gray-600">To-do</span>
                  <div className="flex items-center gap-[8px]">
                    <Progress current={1} total={4} />
                  </div>
                </div>
                <div className="space-y-2 ml-[98px]">
                  <div className="flex gap-[120px]">
                    <Checkbox size="md" label="Todo" checked={false} />
                    <Profile name="K" size="md" variant="blue" />
                  </div>
                  <Button variant="borderless" size="md" className="p-1">
                    <PlusIcon width={16} height={16} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="absolute left-1/2 top-[120px] bottom-0 w-px bg-neutral-200 transform -translate-x-1/2" />

            {/* Right Column */}
            <div className="space-y-6 px-[10px]">
              {/* 받은 요청 */}
              <div className="space-y-3">
                <span className="text-sm text-gray-600">받은 요청</span>
                <div className="bg-gray-50 rounded-2xl h-40 flex items-center justify-center">
                  <div className="text-center">
                    <HelpIcon width={24} height={24} className="mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-400">받은 요청이 없습니다.</p>
                  </div>
                </div>
              </div>

              {/* 업무 요청 */}
              <div className="space-y-3">
                <span className="text-sm text-gray-600">업무 요청</span>
                <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
                  <TextField 
                    placeholder="어떤 요청인가요?" 
                    rows={4}
                    className="bg-white"
                  />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox size="md" label="Todo를 입력해 보세요." checked={false} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Button variant="borderless" size="md" className="p-1">
                        <PlusIcon width={16} height={16} />
                      </Button>
                      <Button variant="filled" color="blue" size="md">
                        요청
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
};

export default TaskDetailPanel; 