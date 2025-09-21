'use client';

import { HelpIcon, InputLabel, PlusIcon } from '@LiteBoard/ui';
import { TaskStatus } from '../../consts/categoryTaskColorMap';
import CategoryYearBox from '../../atoms/category/category-yearbox';
import CategoryTaskCard from '../../molecules/category/category-task-card';
import CategoryField from '../../molecules/category/category-field';
import { CategoryListResponse } from '@/types/category';
import { useCreateTask } from '@/hooks';
import { addDays } from 'date-fns';
import { useState, useRef } from 'react';

const CategoryContainer = ({
  categoryList,
}: {
  categoryList: CategoryListResponse[];
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const taskInputRef = useRef<HTMLInputElement>(null);

  const { mutate: createTask } = useCreateTask();

  const handleAddTask = (categoryId: number) => {
    createTask(
      {
        categoryId,
        taskData: {
          title: newTaskTitle,
          description: '',
          startDate: new Date().toISOString(),
          endDate: addDays(new Date(), 2).toISOString(),
        },
      },
      {
        onSuccess: () => {
          setSelectedCategoryId(null);
          setNewTaskTitle('');
        },
      }
    );
  };

  return (
    <div className="grid grid-rows-[93px_1fr] h-full w-[310px] bg-neutral-100 border-t border-r border-b border-neutral-200">
      {/* TODO: 스크롤에 따른 연동 변경 로직 추가 필요 */}
      <CategoryYearBox year={2025} />

      <div className="flex flex-col flex-shrink-0 gap-4 px-5 py-4 h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-200 scrollbar-track-transparent">
        {categoryList && categoryList.length > 0 ? (
          <>
            {categoryList.map((category) => (
              <div key={category.id}>
                <div className="flex justify-between items-center mb-2">
                  <p className="cursor-pointer text-text-B1M text-neutral-800">
                    {category.title}
                  </p>
                  <div className="p-1 rounded-lg transition-all duration-100 cursor-pointer hover:bg-neutral-200 active:scale-95 active:bg-neutral-300">
                    <PlusIcon
                      width={20}
                      height={20}
                      onClick={() => {
                        setSelectedCategoryId(category.id);
                        setTimeout(() => {
                          taskInputRef.current?.focus();
                        }, 10);
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3 pl-1 select-none">
                  {category.tasks.map((task, index) => (
                    <CategoryTaskCard
                      key={index}
                      task={task}
                      title={task.title}
                      status={task.status as TaskStatus}
                      members={task.members.length > 0 ? task.members : null}
                    />
                  ))}
                </div>

                <div className="mt-2">
                  {selectedCategoryId === category.id && (
                    <InputLabel
                      ref={taskInputRef}
                      placeholder="새 테스크"
                      onCompositionStart={() => setIsComposing(true)}
                      onCompositionEnd={() => setIsComposing(false)}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !isComposing) {
                          handleAddTask(category.id);
                        } else if (e.key === 'Escape') {
                          setNewTaskTitle('');
                          setSelectedCategoryId(null);
                        }
                      }}
                      className="w-full border border-neutral-300 bg-neutral-200"
                    />
                  )}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="flex flex-col gap-3 justify-center items-center mb-3 text-center">
            <HelpIcon className="text-neutral-700" />
            <p className="text-neutral-700">
              등록된 카테고리가 없어요.
              <br />
              카테고리를 추가해주세요.
            </p>
          </div>
        )}

        <CategoryField />
      </div>
    </div>
  );
};

export default CategoryContainer;
