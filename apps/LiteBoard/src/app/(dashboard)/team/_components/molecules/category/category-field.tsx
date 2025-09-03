'use client';
import { InputLabel, PlusIcon } from '@LiteBoard/ui';
import { useCategoryAddStore } from '../../stores/useCategoryAddStore';
import { useRef, useState } from 'react';
import { useClickOutside } from '@/hooks/utils/useClickOutSide';
import { useCreateCategory } from '@/hooks/mutations/category';
import { useProjectContext } from '@/providers/ProjectProvider';

const CategoryField = () => {
  const [categoryName, setCategoryName] = useState('');
  const categoryInputRef = useRef<HTMLInputElement>(null);

  const { selectedProjectId } = useProjectContext();
  const { isCategoryAddOpen, setIsCategoryAddOpen } = useCategoryAddStore();

  const { mutate: createCategory } = useCreateCategory();

  useClickOutside(categoryInputRef, () => {
    setIsCategoryAddOpen(false);
  });

  const handleCategoryAdd = () => {
    createCategory({ projectId: selectedProjectId!, title: categoryName });
    setIsCategoryAddOpen(false);
    setCategoryName('');
  };

  return (
    <div className="mt-[18px] flex flex-col gap-3">
      {isCategoryAddOpen && (
        <InputLabel
          ref={categoryInputRef}
          placeholder="새 카테고리"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleCategoryAdd();
            } else if (e.key === 'Escape') {
              setIsCategoryAddOpen(false);
            }
          }}
          className="w-full border border-neutral-300 bg-neutral-200"
        />
      )}
      <button
        type="button"
        className="flex justify-between items-center gap-3 text-neutral-600 p-1 pr-2 rounded-[6px] text-text-B3M w-[119px] h-6 hover:bg-neutral-200 hover:scale-105 active:scale-95 active:bg-neutral-300 transition-all duration-100"
        onClick={() => setIsCategoryAddOpen(true)}
      >
        <PlusIcon />
        카테고리 추가
      </button>
    </div>
  );
};

export default CategoryField;
