'use client';
import { InputLabel, PlusIcon } from '@LiteBoard/ui';
import { useCategoryAddStore } from '../../stores/useCategoryAddStore';

const CategoryField = () => {
  const { isCategoryAddOpen, setIsCategoryAddOpen } = useCategoryAddStore();

  const handleCategoryAdd = () => {
    setIsCategoryAddOpen(!isCategoryAddOpen);
  };

  return (
    <div className="mt-[18px] flex flex-col gap-3">
      {isCategoryAddOpen && (
        <InputLabel
          placeholder="새 카테고리"
          className="w-full border border-neutral-300 bg-neutral-200"
        />
      )}
      <button
        type="button"
        className="flex justify-between items-center gap-3 text-neutral-600 p-1 pr-2 rounded-[6px] text-text-B3M w-[119px] h-6 hover:bg-neutral-200 hover:scale-105 active:scale-95 active:bg-neutral-300 transition-all duration-100"
        onClick={handleCategoryAdd}
      >
        <PlusIcon />
        카테고리 추가
      </button>
    </div>
  );
};

export default CategoryField;
