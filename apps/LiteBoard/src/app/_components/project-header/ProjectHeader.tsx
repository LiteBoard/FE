'use client';

import { truncateText } from '@/utils';
import { useProjectContext } from '@/providers/ProjectProvider';
import { ProjectTabs } from './ProjectTabs';
import { ProjectShare } from './ProjectShare';

export const ProjectHeader = () => {
  const { selectedProjectName } = useProjectContext();

  return (
    <div className="flex justify-between items-center w-full h-[56px]">
      <div className="flex gap-7 justify-center items-end">
        <p className="text-text-H1 text-neutral-900">
          {truncateText(selectedProjectName ?? '프로젝트', 20)}
        </p>
        <ProjectTabs />
      </div>
      <ProjectShare />
    </div>
  );
};
