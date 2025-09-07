import React from 'react';
import { Profile, Checkbox, TodoActionMenu, DotsThreeIcon, PlusIcon } from '@LiteBoard/ui';
import { RequestCard } from '@/types/request';

interface ReceivedRequestCardProps {
  requestCard: RequestCard;
  showMenuForRequestId: number | null;
  onDotsClick: (requestId: number) => void;
  onEditRequest: (requestId: number) => void;
  onDeleteRequest: (requestId: number) => void;
  menuRef: React.RefObject<HTMLDivElement | null>;
}

const ReceivedRequestCard = ({
  requestCard,
  showMenuForRequestId,
  onDotsClick,
  onEditRequest,
  onDeleteRequest,
  menuRef,
}: ReceivedRequestCardProps) => {
  return (
    <div className="bg-neutral-100 rounded-[20px] p-4 shadow-sm">
      {/* 헤더: 프로필, 이름, 시간, dots 아이콘 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <Profile 
            size="sm" 
            name={requestCard.sender.nickname}
          />
          <span className="text-lg font-medium text-gray-800">
            {requestCard.sender.nickname}
          </span>
          <span className="text-xs text-gray-500">6분 전</span>
        </div>
        <div className="relative">
          <button
            onClick={() => onDotsClick(requestCard.id)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <DotsThreeIcon width={20} height={20} className="text-gray-600" />
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
        <p className="text-sm text-gray-800 leading-relaxed">
          {requestCard.content}
        </p>
      </div>
      
      {/* 투두 목록 */}
      {requestCard.todos && requestCard.todos.length > 0 && (
        <div className="space-y-2">
          {requestCard.todos.map((todo) => (
            <div key={todo.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox size="md" label={todo.description} checked={false} />
              </div>
              <button className="p-1 hover:bg-gray-100 rounded-md transition-colors">
                <PlusIcon width={16} height={16} className="text-gray-600" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReceivedRequestCard; 