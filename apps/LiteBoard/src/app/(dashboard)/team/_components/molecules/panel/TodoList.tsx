import React, { useState, useMemo } from 'react';
import { Progress, Checkbox, Profile, Button, PlusIcon, TextField } from '@LiteBoard/ui';
import { Progress as ProgressType, TodoItem } from '../../types/panel';
import { useCreateTodo } from '@/hooks/mutations/todo/useCreateTodo';
import { CreateTodoRequest } from '@/types/todo';

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
  
  // 임시로 1번 태스크 사용 (실제로는 props로 받은 taskId 사용)
  const currentTaskId = taskId || 1;
  const createTodoMutation = useCreateTodo(currentTaskId);

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

  // 현재 투두 상태 계산 (pendingChanges 반영)
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
          <div key={todo.id} className="flex">
            <div className="flex-1 min-w-0">
              <Checkbox
                size="md"
                label={todo.description}
                checked={todo.checked}
                onChange={() => handleTodoToggle(todo.id, todo.checked)}
              />
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