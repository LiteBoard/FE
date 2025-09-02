import React, { useState, useMemo, useRef } from 'react';
import { Progress, Checkbox, Profile, Button, PlusIcon, TextField, TodoActionMenu } from '@LiteBoard/ui';
import { Progress as ProgressType, TodoItem } from '../../types/panel';
import { useCreateTodo } from '@/hooks/mutations/todo/useCreateTodo';
import { useUpdateTodo } from '@/hooks/mutations/todo/useUpdateTodo';
import { useDeleteTodo } from '@/hooks/mutations/todo/useDeleteTodo';
import { CreateTodoRequest, UpdateTodoRequest } from '@/types/todo';
import { useClickOutside } from '@/hooks/utils/useClickOutSide';

interface TodoListProps {
  progress: ProgressType;
  todos: TodoItem[];
  taskId?: number; // 태스크 ID 추가
  onTodoChanges?: (changes: Map<number, boolean>) => void; // 변경사항을 부모로 전달
}

const TodoList = ({ progress, todos, taskId, onTodoChanges }: TodoListProps) => {
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const [newTodoText, setNewTodoText] = useState('');
  const [pendingChanges, setPendingChanges] = useState<Map<number, boolean>>(new Map());
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');
  const [showMenuForTodoId, setShowMenuForTodoId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // 임시로 1번 태스크 사용 (실제로는 props로 받은 taskId 사용할 예정)
  const currentTaskId = taskId || 1;
  const createTodoMutation = useCreateTodo(currentTaskId);
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  // 투두 토글 핸들러
  const handleTodoToggle = (todoId: number, currentDone: boolean) => {
    const newDone = !currentDone;
    const newChanges = new Map(pendingChanges).set(todoId, newDone);
    setPendingChanges(newChanges);
    
    // 부모 컴포넌트에 변경사항 전달
    if (onTodoChanges) {
      onTodoChanges(newChanges);
    }
  };

  // 라벨 클릭 핸들러 (메뉴 표시)
  const handleLabelClick = (todoId: number) => {
    setShowMenuForTodoId(showMenuForTodoId === todoId ? null : todoId);
  };

  // 편집 버튼 클릭 핸들러
  const handleEditClick = (todoId: number, description: string) => {
    setEditingTodoId(todoId);
    setEditingText(description);
    setShowMenuForTodoId(null); // 메뉴 닫기
  };

  // 편집 완료 핸들러
  const handleEditComplete = async () => {
    if (!editingTodoId || !editingText.trim()) {
      setEditingTodoId(null);
      setEditingText('');
      return;
    }

    try {
      const updateData: UpdateTodoRequest = {
        description: editingText.trim(),
        memberId: 1, // 임시로 1번 멤버 사용
      };
      
      await updateTodoMutation.mutateAsync({ todoId: editingTodoId, todoData: updateData });
      setEditingTodoId(null);
      setEditingText('');
    } catch (error) {
      console.error('투두 수정 실패:', error);
    }
  };

  // 편집 취소 핸들러
  const handleEditCancel = () => {
    setEditingTodoId(null);
    setEditingText('');
  };

  // 삭제 핸들러
  const handleDelete = async (todoId: number) => {
    try {
      await deleteTodoMutation.mutateAsync(todoId);
    } catch (error) {
      console.error('투두 삭제 실패:', error);
    }
  };

  // 키보드 핸들러 (편집 모드)
  const handleEditKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  // 메뉴 외부 클릭 시 메뉴 닫기
  useClickOutside(menuRef, () => {
    if (showMenuForTodoId !== null) {
      setShowMenuForTodoId(null);
    }
  });

  // 투두 추가 핸들러
  const handleAddTodo = () => {
    setIsAddingTodo(true);
  };

  // 투두 생성 제출 핸들러
  const handleSubmitTodo = async () => {
    if (!newTodoText.trim()) {
      setIsAddingTodo(false);
      setNewTodoText('');
      return;
    }

    const todoData: CreateTodoRequest = {
      description: newTodoText.trim(),
      memberId: 1, // 임시로 1번 멤버 사용
    };

    try {
      await createTodoMutation.mutateAsync(todoData);
      setNewTodoText('');
      setIsAddingTodo(false);
    } catch (error) {
      console.error('투두 생성 실패:', error);
    }
  };

  // 엔터키 핸들러
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmitTodo();
    } else if (e.key === 'Escape') {
      setNewTodoText('');
      setIsAddingTodo(false);
    }
  };

  const currentTodos = useMemo(() => {
    return todos.map(todo => ({
      ...todo,
      checked: pendingChanges.has(todo.id) 
        ? pendingChanges.get(todo.id)! 
        : todo.checked
    }));
  }, [todos, pendingChanges]);

  return (
    <div className="space-y-[16px]">
      <div className="flex items-center gap-[63px]">
        <span className="text-text-B3M text-gray-600">To-do</span>
        <div className="flex items-center gap-[8px]">
          <Progress current={progress.current} total={progress.total} />
        </div>
      </div>
      <div className="space-y-2 ml-[98px]">
        {currentTodos.map((todo) => (
          <div key={todo.id} className="flex group relative">
            <div className="flex-1 min-w-0">
              {editingTodoId === todo.id ? (
                // 편집 모드
                <div className="flex items-center gap-2">
                  <Checkbox
                    size="md"
                    label=""
                    checked={todo.checked}
                    onChange={() => handleTodoToggle(todo.id, todo.checked)}
                  />
                  <TextField
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onKeyDown={handleEditKeyDown}
                    onBlur={handleEditComplete}
                    className="flex-1"
                    autoFocus
                    placeholder="수정할 내용을 입력하고 다른 곳을 클릭하세요"
                  />
                </div>
              ) : (
                // 일반 모드
                <div className="flex items-center gap-2">
                  <Checkbox
                    size="md"
                    label=""
                    checked={todo.checked}
                    onChange={() => handleTodoToggle(todo.id, todo.checked)}
                  />
                  <span
                    className="flex-1 text-base font-medium cursor-pointer hover:text-blue-500 transition-colors"
                    onClick={() => handleLabelClick(todo.id)}
                  >
                    {todo.description}
                  </span>
                  {/* 편집/삭제 메뉴 */}
                  <TodoActionMenu
                    isVisible={showMenuForTodoId === todo.id}
                    onEdit={() => handleEditClick(todo.id, todo.description)}
                    onDelete={() => handleDelete(todo.id)}
                    isDeletePending={deleteTodoMutation.isPending}
                    menuRef={menuRef}
                  />
                </div>
              )}
            </div>
            <div className="flex-shrink-0">
              <Profile name={todo.assignee.nickname.charAt(0)} size="md" variant="blue" />
            </div>
          </div>
        ))}
        {isAddingTodo ? (
          <div className="flex items-center gap-2">
            <TextField
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleSubmitTodo}
              placeholder="투두를 입력하세요"
              className="flex-1"
              autoFocus
            />
            {createTodoMutation.isPending && (
              <div className="text-sm text-gray-500">저장 중...</div>
            )}
          </div>
        ) : (
          <Button 
            variant="borderless" 
            size="md" 
            className="p-1"
            onClick={handleAddTodo}
            disabled={createTodoMutation.isPending}
          >
            <PlusIcon width={16} height={16} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default TodoList; 