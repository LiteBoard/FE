"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Chip, Progress, Checkbox, Profile, PlusLargeIcon } from '../index';
import TodoActionMenu from '../TodoActionMenu/TodoActionMenu';

interface Todo {
  id: string;
  text: string;
  checked: boolean;
  assignee: string;
  requested?: boolean;
}

type Status = 'latest' | 'notLatest' | 'delayed' | 'finished';

export interface TodoCardProps {
  status: Status;
  title: string;
  todos: Todo[];
  onTodoChange?: (todoId: string) => void;
  onTodoAdd?: (text: string) => Promise<void>;
  onTodoEdit?: (todoId: string, newText: string) => Promise<void>;
  onTodoDelete?: (todoId: string) => void;
  taskId?: string;
}

const statusChip = {
  latest: { color: 'blue', label: '오늘 마감' },
  notLatest: { color: 'coolGray', label: '1일 남음' },
  delayed: { color: 'red', label: '1일 지연됨' },
  finished: { color: 'blue', label: '완료됨' },
} as const;

type ChipColor = 'blue' | 'coolGray' | 'red' | 'black' | 'green';

export const TodoCard = ({
  status,
  title,
  todos: initialTodos,
  onTodoChange,
  onTodoAdd,
  onTodoEdit,
  onTodoDelete,
  taskId,
}: TodoCardProps) => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [isClient, setIsClient] = useState(false);
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const [newTodoText, setNewTodoText] = useState('');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);

  const isLatest = status === 'latest';

  useEffect(() => {
    setIsClient(true);
  }, []);

  // props로 받은 todos가 변경되면 로컬 상태 업데이트
  useEffect(() => {
    setTodos(initialTodos);
  }, [initialTodos]);

  // 투두 체크 상태 변경 핸들러
  const handleTodoChange = useCallback((todoId: string, checked: boolean) => {
    if (!isClient) return;

    // API 콜백이 있으면 호출
    if (onTodoChange) {
      onTodoChange(todoId);
    }

    // 로컬 상태 업데이트
    setTodos(prevTodos => {
      return prevTodos.map(todo =>
        todo.id === todoId ? { ...todo, checked } : todo
      );
    });
  }, [isClient, onTodoChange]);

  // 새 투두 추가 핸들러
  const handleAddTodo = useCallback(() => {
    setIsAddingTodo(true);
  }, []);

  // 새 투두 저장 핸들러
  const handleSaveTodo = useCallback(async () => {
    if (!newTodoText.trim()) {
      setIsAddingTodo(false);
      setNewTodoText('');
      return;
    }

    try {
      // API 콜백이 있으면 호출
      if (onTodoAdd) {
        await onTodoAdd(newTodoText.trim());
      } else {
        // 기본 동작: 로컬 상태만 업데이트
        const newTodo: Todo = {
          id: Date.now().toString(),
          text: newTodoText.trim(),
          checked: false,
          assignee: '나',
          requested: false,
        };
        setTodos(prevTodos => [...prevTodos, newTodo]);
      }

      setNewTodoText('');
      setIsAddingTodo(false);
    } catch (error) {
      console.error('Todo 추가 실패:', error);
    }
  }, [newTodoText, onTodoAdd]);

  // 새 투두 취소 핸들러
  const handleCancelTodo = useCallback(() => {
    setNewTodoText('');
    setIsAddingTodo(false);
  }, []);

  // 엔터키 처리
  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveTodo();
    } else if (e.key === 'Escape') {
      handleCancelTodo();
    }
  }, [handleSaveTodo, handleCancelTodo]);

  // 메뉴 토글 핸들러
  const handleMenuToggle = useCallback((todoId: string) => {
    setActiveMenuId(activeMenuId === todoId ? null : todoId);
  }, [activeMenuId]);

  // 편집 시작 핸들러
  const handleEditStart = useCallback((todoId: string, currentText: string) => {
    setEditingTodoId(todoId);
    setEditingText(currentText);
    setActiveMenuId(null);
  }, []);

  // 편집 저장 핸들러
  const handleEditSave = useCallback(async (todoId: string) => {
    if (!editingText.trim()) {
      setEditingTodoId(null);
      setEditingText('');
      return;
    }

    try {
      if (onTodoEdit) {
        await onTodoEdit(todoId, editingText.trim());
      } else {
        // 기본 동작: 로컬 상태만 업데이트
        setTodos(prevTodos =>
          prevTodos.map(todo =>
            todo.id === todoId ? { ...todo, text: editingText.trim() } : todo
          )
        );
      }
      setEditingTodoId(null);
      setEditingText('');
    } catch (error) {
      console.error('Todo 편집 실패:', error);
    }
  }, [editingText, onTodoEdit]);

  // 편집 취소 핸들러
  const handleEditCancel = useCallback(() => {
    setEditingTodoId(null);
    setEditingText('');
  }, []);

  // 편집 엔터키 처리
  const handleEditKeyPress = useCallback((e: React.KeyboardEvent, todoId: string) => {
    if (e.key === 'Enter') {
      handleEditSave(todoId);
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
  }, [handleEditSave, handleEditCancel]);

  // 삭제 핸들러
  const handleDelete = useCallback((todoId: string) => {
    if (onTodoDelete) {
      onTodoDelete(todoId);
    } else {
      // 기본 동작: 로컬 상태에서 제거
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
    }
    setActiveMenuId(null);
  }, [onTodoDelete]);

  // 외부 클릭으로 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenuId(null);
      }
    };

    if (activeMenuId) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [activeMenuId]);

  // 현재 진행률 계산
  const done = todos.filter(todo => todo.checked).length;
  const total = todos.length;

  return (
    <div
      className={`rounded-2xl py-7 px-8 ${
        isLatest ? 'bg-blue-50' : 'bg-[#F6F8FB]'
      } w-[388px] flex flex-col gap-4 shadow`}
    >
      {/* Chip + Progress */}
      <div className="flex items-center justify-between">
        <Chip
          color={statusChip[status].color as ChipColor}
          size="sm"
          radius="md"
          variant="filled"
        >
          {statusChip[status].label}
        </Chip>
        <Progress current={done} total={total} />
      </div>

      {/* Title */}
      <div className="font-bold text-2xl text-netural-800 pb-1">
        {title}
      </div>

      {/* Todo List */}
      <div className="flex flex-col gap-2 max-h-[128px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {todos.map((todo) => (
          <div key={todo.id} className="flex items-center relative group">
            <div
              className="flex items-center gap-2 flex-1 min-w-0 cursor-pointer hover:bg-gray-50 rounded px-1 py-1"
              onClick={() => editingTodoId !== todo.id && handleMenuToggle(todo.id)}
            >
              {editingTodoId === todo.id ? (
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  onKeyDown={(e) => handleEditKeyPress(e, todo.id)}
                  onBlur={() => handleEditSave(todo.id)}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full px-2 py-1 text-sm bg-transparent border-0 border-b border-blue-300 rounded-none focus:outline-none focus:border-b-blue-500 focus:border-b-1"
                  autoFocus
                />
              ) : (
                <div onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    size="md"
                    label={todo.text}
                    checked={todo.checked}
                    onChange={(checked) => handleTodoChange(todo.id, checked)}
                  />
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 justify-center min-w-[140px] flex-shrink-0">
              <Profile name={todo.assignee} size="sm" variant="blue" />
              <div className="w-8 relative">
                {todo.requested && !editingTodoId && (
                  <span className="text-xs text-gray-400">요청됨</span>
                )}
                <TodoActionMenu
                  isVisible={activeMenuId === todo.id}
                  onEdit={() => handleEditStart(todo.id, todo.text)}
                  onDelete={() => handleDelete(todo.id)}
                  menuRef={menuRef}
                />
              </div>
            </div>
          </div>
        ))}
        
        {/* 새 투두 추가 인풋 */}
        {isAddingTodo && (
          <div className="flex items-center">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <input
                type="text"
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                onKeyDown={handleKeyPress}
                onBlur={handleSaveTodo}
                placeholder="새 할일을 입력하세요"
                className="w-full px-2 py-1 text-sm bg-transparent border-0 border-b border-blue-300 rounded-none focus:outline-none focus:border-b-blue-500 focus:border-b-1"
                autoFocus
              />
            </div>
            <div className="flex items-center gap-2 justify-center min-w-[140px] flex-shrink-0">
              <Profile name="나" size="sm" variant="blue" />
              <div className="w-8"></div>
            </div>
          </div>
        )}
      </div>

      {/* Add Button */}
      {!isAddingTodo && (
        <button 
          onClick={handleAddTodo}
          className="flex items-center justify-start text-netural-700 mt-2 hover:bg-gray-100 rounded-lg p-2 transition-colors self-start"
        >
          <PlusLargeIcon className="text-neutral-600" />
        </button>
      )}
    </div>
  );
};
