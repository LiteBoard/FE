'use client';

import { Modal } from '@LiteBoard/ui';
import { useRouter } from 'next/navigation';
import EmailField from './_components/email-field';

const ProjectShareModal = () => {
  const router = useRouter();

  return (
    <Modal
      isOpen={true}
      title="프로젝트 공유"
      width="630"
      isActionModal={false}
      showCloseIcon={true}
      onCloseIconClick={() => {
        router.back();
      }}
    >
      <span className="absolute border border-t-neutral-200 h-[1px] top-[98px]" />
      <div className="flex justify-center items-center w-full">
        <EmailField />
      </div>
    </Modal>
  );
};

export default ProjectShareModal;
