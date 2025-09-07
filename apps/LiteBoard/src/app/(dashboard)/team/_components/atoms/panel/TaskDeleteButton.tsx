import React, { useState } from 'react';
import { Button, TrashIcon, Modal } from '@LiteBoard/ui';
import { useDeleteTask } from '@/hooks/mutations/task/useDeleteTask';

interface TaskDeleteButtonProps {
  taskId: number;
  onDeleteSuccess?: () => void; // 삭제 성공 시 콜백
}

const TaskDeleteButton = ({ taskId, onDeleteSuccess }: TaskDeleteButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const deleteTaskMutation = useDeleteTask();

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteTaskMutation.mutateAsync(taskId);
      console.log('업무 삭제 완료:', taskId);
      
      // 삭제 성공 시 콜백 실행 (패널 닫기 등)
      if (onDeleteSuccess) {
        onDeleteSuccess();
      }
      
      // 모달 닫기
      setIsModalOpen(false);
    } catch (error) {
      console.error('업무 삭제 실패:', error);
    }
  };

  return (
    <>
      <Button 
        variant="borderless" 
        size="md" 
        className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleDeleteClick}
        disabled={deleteTaskMutation.isPending}
      >
        <TrashIcon width={24} height={24} />
        <span className="text-text-T3 text-neutral-600">
          {deleteTaskMutation.isPending ? '삭제 중...' : '업무 삭제'}
        </span>
      </Button>

      <Modal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        title="정말 삭제하시겠습니까?"
        description="관련 데이터가 모두 삭제됩니다."
        isButton={true}
        leftText="취소"
        rightText="삭제"
        onLeftButtonClick={handleModalClose}
        onRightButtonClick={handleDeleteConfirm}
        isDisabledButton={deleteTaskMutation.isPending}
        width="378"
        className="gap-6"
      />
    </>
  );
};

export default TaskDeleteButton; 