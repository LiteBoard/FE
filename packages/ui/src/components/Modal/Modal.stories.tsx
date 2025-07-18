import React from 'react';
import { Modal } from './Modal';
import type { Meta, StoryObj } from '@storybook/react';
import { WarnIcon } from '../Icon';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    className: { control: 'text' },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => <Modal isOpen={true} showCloseIcon={false} />,
};

export const Delete: Story = {
  render: () => (
    <Modal isOpen={true} isButton={true} showCloseIcon={false} width={'378'}>
      <div className="flex flex-col justify-center items-start mb-6 space-y-3">
        <div className="flex gap-2 items-center">
          <WarnIcon />
          <div className="text-text-T0">정말 삭제하시겠습니까?</div>
        </div>
        <div className="text-neutral-500 text-text-B2M">
          관련 데이터가 모두 삭제됩니다.
        </div>
      </div>
    </Modal>
  ),
};

export const Task: Story = {
  render: () => (
    <Modal
      isOpen={true}
      isButton={false}
      showCloseIcon={true}
      isActionModal={false}
      title={'Project Title 공유'}
      width={'632'}
    >
      <div className="flex justify-center items-center w-full">
        <p>본문 내용을 작성하는 영역입니다.</p>
      </div>
    </Modal>
  ),
};
