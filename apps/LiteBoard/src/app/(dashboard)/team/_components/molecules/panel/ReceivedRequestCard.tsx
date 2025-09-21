import React, { useState, useRef, useEffect } from 'react';
import { Profile, Checkbox, TodoActionMenu, DotsThreeIcon, PlusIcon, TextField, Button } from '@LiteBoard/ui';
import { RequestCard } from '@/types/request';
import { useAcceptRequestCardTodo } from '@/hooks/mutations/requestCard';
import { useUpdateRequestCard } from '@/hooks/mutations/requestCard/useUpdateRequestCard';
import { useClickOutside } from '@/hooks/utils/useClickOutSide';

interface ReceivedRequestCardProps {
  requestCard: RequestCard;
  showMenuForRequestId: number | null;
  onDotsClick: (requestId: number) => void;
  onEditRequest: (requestId: number) => void;
  onDeleteRequest: (requestId: number) => void;
  onCancelEdit: () => void;
  menuRef: React.RefObject<HTMLDivElement | null>;
  taskId?: number;
  isDeletePending?: boolean;
  isEditing?: boolean;
}

const ReceivedRequestCard = ({
  requestCard,
  showMenuForRequestId,
  onDotsClick,
  onEditRequest,
  onDeleteRequest,
  onCancelEdit,
  menuRef,
  taskId,
  isDeletePending = false,
  isEditing = false,
}: ReceivedRequestCardProps) => {
  const [editContent, setEditContent] = useState(requestCard.content);
  const [editTodos, setEditTodos] = useState<string[]>(
    requestCard.todos?.map(todo => todo.description) || []
  );
  const [newTodoText, setNewTodoText] = useState('');
  const [isAddingTodo, setIsAddingTodo] = useState(false);

  const editFormRef = useRef<HTMLDivElement>(null);
  const acceptTodoMutation = useAcceptRequestCardTodo(taskId);
  const updateRequestCardMutation = useUpdateRequestCard();

  // 수정 모드가 시작될 때 초기값 설정
  useEffect(() => {
    if (isEditing) {
      setEditContent(requestCard.content);
      setEditTodos(requestCard.todos?.map(todo => todo.description) || []);
      setNewTodoText('');
      setIsAddingTodo(false);
    }
  }, [isEditing, requestCard]);

  // 수정 모드에서 바깥 클릭 시 취소
  useClickOutside(editFormRef, () => {
    if (isEditing) {
      onCancelEdit();
    }
  });

  const handleAcceptTodo = async (requestCardId: number, requestCardTodoId: number) => {
    try {
      await acceptTodoMutation.mutateAsync({ requestCardId, requestCardTodoId });
    } catch (error) {
      console.error('수락 실패', error);
    }
  };

  const handleAddEditTodo = () => {
    if (newTodoText.trim()) {
      setEditTodos([...editTodos, newTodoText.trim()]);
      setNewTodoText('');
      setIsAddingTodo(false);
    } else {
      setIsAddingTodo(false);
    }
  };

  const handleRemoveEditTodo = (index: number) => {
    setEditTodos(editTodos.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddEditTodo();
    } else if (e.key === 'Escape') {
      setNewTodoText('');
      setIsAddingTodo(false);
    }
  };

  const handleSaveEdit = async () => {
    try {
      await updateRequestCardMutation.mutateAsync({
        requestCardId: requestCard.id,
        requestData: {
          content: editContent.trim(),
          todoDescriptions: editTodos,
        },
      });
      onCancelEdit();
    } catch (error) {
      console.error('업무 요청 수정 실패:', error);
    }
  };

  if (isEditing) {
    return (
      <div ref={editFormRef} className="bg-neutral-100 rounded-[20px] p-4">
        {/* 헤더: 프로필, 이름, 시간 (수정 모드에서는 dots 없음) */}
        <div className="flex items-center gap-3 mb-3">
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

        {/* 수정 폼 */}
        <div className="space-y-3">
          {/* 요청 내용 수정 */}
          <TextField
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            placeholder="업무 요청 내용을 입력하세요"
            rows={3}
            className="bg-white"
          />

          {/* 투두 목록 수정 */}
          <div className="space-y-2">
            {/* 기존 투두들 */}
            {editTodos.map((todo, index) => (
              <div key={index} className="flex items-center gap-2">
                <Checkbox size="md" label={todo} checked={false} />
                <Button
                  variant="borderless"
                  size="md"
                  className="p-1 text-neutral-700 hover:text-red-500 bg-transparent hover:bg-transparent"
                  onClick={() => handleRemoveEditTodo(index)}
                >
                  <PlusIcon width={16} height={16} className="rotate-45" />
                </Button>
              </div>
            ))}

            {/* 새로운 투두 입력 */}
            {isAddingTodo ? (
              <div className="flex items-center gap-2">
                <TextField
                  value={newTodoText}
                  onChange={(e) => setNewTodoText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={handleAddEditTodo}
                  placeholder="투두를 입력하세요"
                  className="flex-1 bg-white"
                  autoFocus
                />
              </div>
            ) : (
              editTodos.length === 0 && (
                <div className="flex items-center gap-2">
                  <Checkbox
                    size="md"
                    label="Todo를 입력해보세요."
                    checked={false}
                  />
                </div>
              )
            )}

            {/* 투두 추가 버튼 및 저장/취소 버튼 */}
            <div className="flex items-center justify-between">
              <Button
                variant="borderless"
                size="md"
                className="p-1 bg-transparent hover:bg-transparent"
                onClick={() => setIsAddingTodo(true)}
                disabled={isAddingTodo}
              >
                <PlusIcon width={16} height={16} />
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  color="black"
                  size="md"
                  onClick={onCancelEdit}
                  disabled={updateRequestCardMutation.isPending}
                >
                  취소
                </Button>
                <Button
                  variant="filled"
                  color="blue"
                  size="md"
                  onClick={handleSaveEdit}
                  disabled={!editContent.trim() || updateRequestCardMutation.isPending}
                >
                  {updateRequestCardMutation.isPending ? '저장 중...' : '저장'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            isDeletePending={isDeletePending}
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