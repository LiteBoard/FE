"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Chip, Progress, Checkbox, Profile } from '../index';

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
}

const statusChip = {
  latest: { color: 'blue', label: '오늘 마감' },
  notLatest: { color: 'coolGray', label: '1일 남음' },
  delayed: { color: 'red', label: '1일 지연됨' },
  finished: { color: 'blue', label: '완료됨' },
} as const;

type ChipColor = 'blue' | 'coolGray' | 'red' | 'black' | 'green';

export const TodoCard: React.FC<TodoCardProps> = ({
  status,
  title,
  todos: initialTodos,
}) => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [isClient, setIsClient] = useState(false);

  const isLatest = status === 'latest';

  useEffect(() => {
    setIsClient(true);
  }, []);

  // 투두 체크 상태 변경 핸들러
  const handleTodoChange = useCallback((todoId: string, checked: boolean) => {
    if (!isClient) return;
    
    setTodos(prevTodos => {
      return prevTodos.map(todo =>
        todo.id === todoId ? { ...todo, checked } : todo
      );
    });
  }, [isClient]);

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
          <div key={todo.id} className="flex items-center">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Checkbox
                size="md"
                label={todo.text}
                defaultChecked={todo.checked}
                onChange={(checked) => handleTodoChange(todo.id, checked)}
              />
            </div>
            <div className="flex items-center gap-2 justify-center min-w-[140px] flex-shrink-0">
              <Profile name={todo.assignee} size="sm" variant="blue" />
              <div className="w-8">
                {todo.requested && (
                  <span className="text-xs text-gray-400">요청됨</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Button */}
      <button className="text-netural-700 text-xl mt-2">+</button>
    </div>
  );
};
