import React from 'react';
import { Button, TrashIcon } from '@LiteBoard/ui';
import { useDeleteTask } from '@/hooks/mutations/task/useDeleteTask';

interface TaskDeleteButtonProps {
  taskId: number;
  onDeleteSuccess?: () => void; // 삭제 성공 시 콜백
}

const TaskDeleteButton = ({ taskId, onDeleteSuccess }: TaskDeleteButtonProps) => {
  const deleteTaskMutation = useDeleteTask();

  const handleDelete = async () => {
    if (!confirm('정말로 이 업무를 삭제하시겠습니까?')) {
      return;
    }

    try {
      await deleteTaskMutation.mutateAsync(taskId);
      console.log('업무 삭제 완료:', taskId);
      
      // 삭제 성공 시 콜백 실행 (패널 닫기 등)
      if (onDeleteSuccess) {
        onDeleteSuccess();
      }
    } catch (error) {
      console.error('업무 삭제 실패:', error);
    }
  };

  return (
    <Button 
      variant="borderless" 
      size="md" 
      className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={handleDelete}
      disabled={deleteTaskMutation.isPending}
    >
      <TrashIcon width={24} height={24} />
      <span className="text-text-T3 text-neutral-600">
        {deleteTaskMutation.isPending ? '삭제 중...' : '업무 삭제'}
      </span>
    </Button>
  );
};

export default TaskDeleteButton; 