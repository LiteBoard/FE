import React from 'react';
import { Panel } from '@LiteBoard/ui';

interface TaskDetailErrorProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'loading' | 'error' | 'not-found';
  error?: Error;
}

const TaskDetailError: React.FC<TaskDetailErrorProps> = ({
  isOpen,
  onClose,
  type,
  error,
}) => {
  const getErrorContent = () => {
    switch (type) {
      case 'loading':
        return (
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        );
      
      case 'error':
        return (
          <div className="text-red-500">
            <h3 className="text-lg font-semibold mb-2">업무 정보 로딩 실패</h3>
            <p>{error?.message || '알 수 없는 오류가 발생했습니다.'}</p>
          </div>
        );
      
      case 'not-found':
        return (
          <div className="text-gray-500">
            <h3 className="text-lg font-semibold mb-2">업무 정보를 찾을 수 없습니다</h3>
            <p>요청하신 업무 정보가 존재하지 않습니다.</p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Panel isOpen={isOpen} onClose={onClose} height="fixed">
      <div className="flex flex-col h-full">
        <div className="p-6">
          {getErrorContent()}
        </div>
      </div>
    </Panel>
  );
};

export default TaskDetailError; 