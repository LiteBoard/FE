import { useTruncateText } from '@/utils/useTruncateText';
import { ProjectTabs } from './ProjectTabs';
import { ProjectShare } from './ProjectShare';

export const ProjectHeader = () => {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex gap-7 justify-center items-end">
        <p className="text-text-H1 text-neutral-900">
          {useTruncateText('이거이십글자에맞춘거야어떤가용가리???', 20)}
        </p>
        <ProjectTabs />
      </div>
      <ProjectShare />
    </div>
  );
};
