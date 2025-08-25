import React from 'react';
import { Profile, Button, XBoldIcon } from '@LiteBoard/ui';
import { Assignee as AssigneeType } from '../../types/panel';

interface AssigneeProps {
  assignee: AssigneeType;
}

const Assignee = ({ assignee }: AssigneeProps) => {
  return (
    <div className="flex items-center gap-[64px]">
      <span className="text-text-B3M text-neutral-700">담당자</span>
      <div className="flex items-center gap-3">
        <Profile name={assignee.nickname.charAt(0)} size="lg" variant="skyBlue" />
        <span className="text-text-B1M text-neutral-800">{assignee.nickname}</span>
        <Button variant="borderless" size="md">
          <XBoldIcon width={16} height={16} />
        </Button>
      </div>
    </div>
  );
};

export default Assignee; 