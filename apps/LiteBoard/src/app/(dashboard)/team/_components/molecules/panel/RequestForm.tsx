import React, { useState, useRef, useEffect } from 'react';
import { TextField, Checkbox, Button, PlusIcon, HelpIcon } from '@LiteBoard/ui';
import { ReceivedRequest, WorkRequest } from '../../types/panel';
import { useCreateRequestCard } from '@/hooks/mutations/requestCard/useCreateRequestCard';
import { useRequestCardList } from '@/hooks/queries/requestCard/useRequestCardList';
import { CreateRequestCardRequest } from '@/types/request';
import ReceivedRequestCard from './ReceivedRequestCard';

interface RequestFormProps {
  receivedRequests: ReceivedRequest[];
  workRequest: WorkRequest;
  taskId?: number; // 태스크 ID 추가
}

const RequestForm = ({ workRequest, taskId }: RequestFormProps) => {
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const [requestContent, setRequestContent] = useState('');
  const [showMenuForRequestId, setShowMenuForRequestId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const createRequestCardMutation = useCreateRequestCard();
  
  // 업무 요청 목록 조회
  const { data: requestCards, isLoading: isLoadingRequestCards } = useRequestCardList(
    taskId || 0,
    { enabled: !!taskId }
  );

  // 클릭 외부 감지로 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenuForRequestId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAddTodo = () => {
    if (newTodoText.trim()) {
      setTodos([...todos, newTodoText.trim()]);
      setNewTodoText('');
      setIsAddingTodo(false);
    } else {
      setIsAddingTodo(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    } else if (e.key === 'Escape') {
      setNewTodoText('');
      setIsAddingTodo(false);
    }
  };

  const handleRemoveTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleSubmitRequest = async () => {
    if (!taskId || !requestContent.trim()) {
      return;
    }

    const requestData: CreateRequestCardRequest = {
      content: requestContent.trim(),
      todoDescriptions: todos,
    };

    try {
      await createRequestCardMutation.mutateAsync({ taskId, requestData });
      console.log('업무 요청 생성 완료');
      
      // 폼 초기화
      setRequestContent('');
      setTodos([]);
    } catch (error) {
      console.error('업무 요청 생성 실패:', error);
    }
  };

  const handleDotsClick = (requestId: number) => {
    setShowMenuForRequestId(showMenuForRequestId === requestId ? null : requestId);
  };

  const handleEditRequest = (requestId: number) => {
    console.log('편집 요청:', requestId);
    setShowMenuForRequestId(null);
  };

  const handleDeleteRequest = (requestId: number) => {
    console.log('삭제 요청:', requestId);
    setShowMenuForRequestId(null);
  };

  return (
    <div className="space-y-6 px-[10px]">
      {/* 받은 요청 */}
      <div className="space-y-3">
        <span className="text-sm text-gray-600">받은 요청</span>
        <div className="bg-[#f2f4f6] rounded-[20px] h-[166px] w-[328px] p-[16px] flex items-center justify-center">
          {isLoadingRequestCards ? (
            <div className="text-center">
              <p className="text-sm text-gray-400">로딩 중...</p>
            </div>
          ) : requestCards && requestCards.length > 0 ? (
            <div className="w-full h-full overflow-y-auto space-y-3">
              {requestCards.map((requestCard) => (
                <ReceivedRequestCard
                  key={requestCard.id}
                  requestCard={requestCard}
                  showMenuForRequestId={showMenuForRequestId}
                  onDotsClick={handleDotsClick}
                  onEditRequest={handleEditRequest}
                  onDeleteRequest={handleDeleteRequest}
                  menuRef={menuRef}
                />
              ))}
            </div>
          ) : (
            <div className="text-center">
              <HelpIcon width={24} height={24} className="mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-400">받은 요청이 없습니다.</p>
            </div>
          )}
        </div>
      </div>

      {/* 업무 요청 */}
      <div className="space-y-3">
        <span className="text-sm text-gray-600">업무 요청</span>
        <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
          <TextField 
            value={requestContent}
            onChange={(e) => setRequestContent(e.target.value)}
            placeholder={workRequest.placeholder}
            rows={4}
            className="bg-white"
          />
          <div className="space-y-2">
            {/* 기존 투두들 */}
            {todos.map((todo, index) => (
              <div key={index} className="flex items-center gap-2">
                <Checkbox size="md" label={todo} checked={false} />
                <Button 
                  variant="borderless" 
                  size="md" 
                  className="p-1 text-neutral-700 hover:text-red-500 bg-transparent hover:bg-transparent"
                  onClick={() => handleRemoveTodo(index)}
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
                  onBlur={handleAddTodo}
                  placeholder="투두를 입력하세요"
                  className="flex-1 bg-white"
                  autoFocus
                />
              </div>
            ) : (
              // 투두 목록이 비어있을 때만 플레이스홀더 표시
              todos.length === 0 && (
                <div className="flex items-center gap-2">
                  <Checkbox 
                    size="md" 
                    label="Todo를 입력해보세요." 
                    checked={false}
                  />
                </div>
              )
            )}
            
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
              <Button 
                variant="filled" 
                color="blue" 
                size="md"
                onClick={handleSubmitRequest}
                disabled={!requestContent.trim() || createRequestCardMutation.isPending}
              >
                {createRequestCardMutation.isPending ? '요청 중...' : '요청'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestForm; 