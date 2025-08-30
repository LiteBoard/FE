'use client';

import { Modal } from '@LiteBoard/ui';
import { useRouter, useSearchParams } from 'next/navigation';
import EmailField from './_components/email-field';
import MemberList from './_components/member-list';

const ProjectShareModal = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // const projectId = searchParams.get('projectId');
  const projectName = searchParams.get('projectName');

  return (
    <Modal
      isOpen={true}
      title={`${projectName} 공유`}
      width="632"
      isActionModal={false}
      showCloseIcon={true}
      onCloseIconClick={() => {
        router.back();
      }}
    >
      <div className="flex flex-col justify-center items-center w-full gap-[56px]">
        <div className="flex flex-col gap-3 justify-center items-start w-full">
          <div className="flex justify-between items-center w-full">
            <p className="text-text-T1 text-neutral-700">이메일로 초대</p>
          </div>
          <EmailField />
        </div>

        <span className="absolute top-[293px] w-full h-[1px] bg-neutral-200" />

        <div className="flex flex-col gap-3 justify-center items-start w-full">
          <p className="text-neutral-700 text-text-T1">멤버</p>
          <MemberList />
        </div>
      </div>
    </Modal>
  );
};

export default ProjectShareModal;
