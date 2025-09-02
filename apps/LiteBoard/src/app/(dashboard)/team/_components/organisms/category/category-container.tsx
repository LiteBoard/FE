'use client';

import { HelpIcon, PlusIcon } from '@LiteBoard/ui';
import { TaskStatus } from '../../consts/categoryTaskColorMap';
import CategoryYearBox from '../../atoms/category/category-yearbox';
import CategoryTaskCard from '../../molecules/category/category-task-card';
import CategoryField from '../../molecules/category/category-field';
import { CategoryListResponse } from '@/types/category';

const CategoryContainer = ({
  categoryList,
}: {
  categoryList: CategoryListResponse[];
}) => {
  return (
    <div className="grid grid-rows-[93px_1fr] h-full w-[310px] bg-neutral-100 border-t border-r border-b border-neutral-200">
      <CategoryYearBox year={2025} />

      <div className="flex flex-col flex-shrink-0 gap-4 px-5 py-4">
        {categoryList && categoryList.length > 0 ? (
          <>
            {categoryList.map((category) => (
              <div key={category.id}>
                <div className="flex justify-between items-center mb-2">
                  <p className="cursor-pointer text-text-B1M text-neutral-800">
                    {category.title}
                  </p>
                  <div className="p-1 rounded-lg transition-all duration-100 cursor-pointer hover:bg-neutral-200 active:scale-95 active:bg-neutral-300">
                    <PlusIcon width={20} height={20} />
                  </div>
                </div>

                <div className="flex flex-col gap-3 pl-1 select-none">
                  {category.tasks.map((task, index) => (
                    <CategoryTaskCard
                      key={index}
                      title={task.title}
                      status={task.status as TaskStatus}
                      members={task.members.length > 0 ? task.members : null}
                    />
                  ))}
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
