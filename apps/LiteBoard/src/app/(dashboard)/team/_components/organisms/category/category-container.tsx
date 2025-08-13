import { PlusIcon } from '@LiteBoard/ui';
import { TaskStatus } from '../../consts/categoryTaskColorMap';
import CategoryYearBox from '../../atoms/category/category-yearbox';
import CategoryTaskCard from '../../molecules/category/category-task-card';
import CategoryField from '../../molecules/category/category-field';

// 카테고리 박스 테스크 더미 데이터
const categoryTaskList: { description: string; status: TaskStatus }[] = [
  {
    description: '하위테스크더미데이터입니다.',
    status: 'PENDING',
  },
  {
    description: '하위테스크더미데이터입니다.',
    status: 'IN_PROGRESS',
  },
  {
    description: '하위테스크더미데이터입니다.',
    status: 'DELAYED',
  },
  {
    description: '하위테스크더미데이터입니다.',
    status: 'COMPLETED',
  },
];

const CategoryContainer = () => {
  return (
    <div className="grid grid-rows-[93px_1fr] min-h-[752px] h-full w-[310px] bg-neutral-100 border-t border-r border-b border-neutral-200">
      <CategoryYearBox year={2025} />

      <div className="flex flex-col flex-shrink-0 px-5 py-4 gap-[2px]">
        <div className="flex justify-between items-center mb-3">
          <p className="select-none text-text-B1M text-neutral-800">카테고리</p>
          <button
            type="button"
            role="button"
            className="p-[2px] rounded-[6px] hover:bg-neutral-200 active:bg-neutral-300 transition-colors duration-100 active:scale-95"
          >
            <PlusIcon className="text-neutral-700" />
          </button>
        </div>

        <div className="flex flex-col gap-3 pl-1">
          {categoryTaskList.map((task, index) => (
            <CategoryTaskCard
              key={index}
              description={task.description}
              status={task.status as TaskStatus}
            />
          ))}
        </div>

        <CategoryField />
      </div>
    </div>
  );
};

export default CategoryContainer;
