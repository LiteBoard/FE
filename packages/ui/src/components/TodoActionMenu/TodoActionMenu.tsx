import React from 'react';
import { PencilIcon, TrashIcon } from '../Icon';

interface TodoActionMenuProps {
  isVisible: boolean;
  onEdit: () => void;
  onDelete: () => void;
  isDeletePending?: boolean;
  menuRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

const TodoActionMenu: React.FC<TodoActionMenuProps> = ({
  isVisible,
  onEdit,
  onDelete,
  isDeletePending = false,
  menuRef,
  className = '',
}) => {
  if (!isVisible) return null;

  return (
    <div 
      ref={menuRef} 
      className={`absolute right-0 mt-2 w-24 bg-white rounded-lg shadow-lg border border-gray-200 z-10 ${className}`}
    >
      <div className="py-1">
        <button
          className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors"
          onClick={onEdit}
        >
          <PencilIcon width={14} height={14} />
          편집
        </button>
        <button
          className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onDelete}
          disabled={isDeletePending}
        >
          <TrashIcon width={14} height={14} />
          삭제
        </button>
      </div>
    </div>
  );
};

export default TodoActionMenu; 