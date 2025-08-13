'use client';

import { truncateText } from '@/utils/truncateText';
import { ProjectTabs } from './ProjectTabs';
import { ProjectShare } from './ProjectShare';

export const ProjectHeader = () => {
  return (
    <div className="flex justify-between items-center w-full h-[56px]">
      <div className="flex gap-7 justify-center items-end">
        <p className="text-text-H1 text-neutral-900">
          {truncateText('타이틀', 20)}
        </p>
        <ProjectTabs />
      </div>
      <ProjectShare />
    </div>
  );
};
