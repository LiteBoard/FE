import React from 'react';
import { Profile, Checkbox, TodoActionMenu, DotsThreeIcon, PlusIcon } from '@LiteBoard/ui';
import { RequestCard } from '@/types/request';
import { useAcceptRequestCardTodo } from '@/hooks/mutations/requestCard';

interface ReceivedRequestCardProps {
  requestCard: RequestCard;
  showMenuForRequestId: number | null;
  onDotsClick: (requestId: number) => void;
  onEditRequest: (requestId: number) => void;
  onDeleteRequest: (requestId: number) => void;
  menuRef: React.RefObject<HTMLDivElement | null>;
  taskId?: number;
}

const ReceivedRequestCard = ({
  requestCard,
  showMenuForRequestId,
  onDotsClick,
  onEditRequest,
  onDeleteRequest,
  menuRef,
  taskId,
}: ReceivedRequestCardProps) => {
  const acceptTodoMutation = useAcceptRequestCardTodo(taskId);

  const handleAcceptTodo = async (requestCardId: number, requestCardTodoId: number) => {
    try {
      await acceptTodoMutation.mutateAsync({ requestCardId, requestCardTodoId });
    } catch (error) {
      console.error('수락 실패', error);
    }
  };

  return (
    <div className="bg-neutral-100 rounded-[20px] p-4">
      {/* 헤더: 프로필, 이름, 시간, dots 아이콘 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <Profile 
            size="sm" 
            name={requestCard.sender.nickname.charAt(0)}
            variant="blue"
          />
          <span className="text-lg font-medium text-neutral-800">
            {requestCard.sender.nickname}
          </span>
          <span className="text-xs font-medium text-neutral-500">6분 전</span>
        </div>
        <div className="relative">
          <button
            onClick={() => onDotsClick(requestCard.id)}
            className="p-1 hover:bg-neutral-200 rounded-full transition-colors"
          >
            <DotsThreeIcon width={20} height={20} className="text-neutral-600 rotate-90" />
          </button>
          
          {/* TodoActionMenu 컴포넌트 사용 */}
          <TodoActionMenu
            isVisible={showMenuForRequestId === requestCard.id}
            onEdit={() => onEditRequest(requestCard.id)}
            onDelete={() => onDeleteRequest(requestCard.id)}
            menuRef={menuRef}
            className="top-8"
          />
        </div>
      </div>
      
      {/* 요청 내용 */}
      <div className="mb-3">
        <p className="text-sm font-medium text-neutral-800 leading-relaxed">
          {requestCard.content}
        </p>
      </div>
      
      {/* 투두 목록 */}
      {requestCard.todos && requestCard.todos.length > 0 && (
        <div className="space-y-2">
          {requestCard.todos.map((todo) => (
            <div key={todo.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox 
                  size="md" 
                  label={todo.description} 
                  checked={false}
                  onChange={() => {}}
                />
              </div>
              <button 
                className="p-1 hover:bg-neutral-200 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handleAcceptTodo(requestCard.id, todo.id)}
                disabled={acceptTodoMutation.isPending}
                title="요청받은 할 일 수락"
              >
                <PlusIcon 
                  width={16} 
                  height={16} 
                  className={`text-neutral-600 ${acceptTodoMutation.isPending ? 'animate-pulse' : ''}`} 
                />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReceivedRequestCard; 