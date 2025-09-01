'use client';

import { useProjectContext } from '@/providers/ProjectProvider';
import { Button, Profile } from '@LiteBoard/ui';
import { useRouter, usePathname } from 'next/navigation';

export const ProjectShare = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { selectedProjectId, selectedProjectName } = useProjectContext();

  const handleShare = () => {
    const currentTab = pathname === '/mywork' ? 'mywork' : 'team';
    router.push(
      `/project-share?currentTab=${currentTab}&projectId=${selectedProjectId}&projectName=${selectedProjectName}`
    );
  };

  return (
    <div className="flex gap-3 justify-center items-center">
      <div className="flex">
        <div className="z-10">
          <Profile name="K" variant="skyBlue" />
        </div>
        <div className="z-20 -ml-2">
          <Profile name="K" variant="blue" />
        </div>
        <div className="z-30 -ml-2">
          <Profile name="K" variant="purple" />
        </div>
        <div className="z-40 -ml-2">
          <Profile name="K" variant="corral" />
        </div>
      </div>

      <Button
        size="md"
        variant="outline"
        className="bg-neutral-100 text-neutral-700 hover:bg-neutral-200 active:bg-neutral-300"
        onClick={handleShare}
      >
        공유하기
      </Button>
    </div>
  );
};
