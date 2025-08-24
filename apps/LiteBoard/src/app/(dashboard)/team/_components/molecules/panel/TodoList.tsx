import React from 'react';
import { Progress, Checkbox, Profile, Button, PlusIcon } from '@LiteBoard/ui';
import { Progress as ProgressType, TodoItem } from '../../types/panel';

interface TodoListProps {
  progress: ProgressType;
  todos: TodoItem[];
}

const TodoList = ({ progress, todos }: TodoListProps) => {
  return (
    <div className="space-y-[16px]">
      <div className="flex items-center gap-[63px]">
        <span className="text-text-B3M text-gray-600">To-do</span>
        <div className="flex items-center gap-[8px]">
          <Progress current={progress.current} total={progress.total} />
        </div>
      </div>
      <div className="space-y-2 ml-[98px]">
        {todos.map((todo) => (
          <div key={todo.id} className="flex gap-[120px]">
            <Checkbox 
              size="md" 
              label={todo.description} 
              checked={todo.checked}
            />
            <Profile name={todo.assignee.nickname.charAt(0)} size="md" variant="blue" />
          </div>
        ))}
        <Button variant="borderless" size="md" className="p-1">
          <PlusIcon width={16} height={16} />
        </Button>
      </div>
    </div>
  );
};

export default TodoList; 