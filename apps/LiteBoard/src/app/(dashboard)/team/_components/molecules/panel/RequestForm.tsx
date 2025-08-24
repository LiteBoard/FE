import React from 'react';
import { TextField, Checkbox, Button, PlusIcon, HelpIcon } from '@LiteBoard/ui';
import { ReceivedRequest, WorkRequest } from '../../types/panel';

interface RequestFormProps {
  receivedRequests: ReceivedRequest[];
  workRequest: WorkRequest;
}

const RequestForm = ({ receivedRequests, workRequest }: RequestFormProps) => {
  return (
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
            placeholder={workRequest.placeholder}
            rows={4}
            className="bg-white"
          />
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox size="md" label={workRequest.todoLabel} checked={false} />
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
  );
};

export default RequestForm; 