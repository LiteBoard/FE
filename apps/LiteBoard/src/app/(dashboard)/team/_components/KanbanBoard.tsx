'use client';

import { useProjectContext } from '@/providers/ProjectProvider';
import CategoryContainer from './organisms/category/category-container';
import TimelineContainer from './organisms/timeline/timeline-container';
import { useGetCategoryList } from '@/hooks/queries/category';

const KanbanBoard = () => {
  const { selectedProjectId } = useProjectContext();
  const {
    data: categoryList,
    isLoading,
    isError,
  } = useGetCategoryList({
    projectId: selectedProjectId!,
    enabled: !!selectedProjectId,
  });

  if (isLoading) {
    //TODO: 로딩 스켈레톤
    return <div>Loading...</div>;
  }

  if (isError) {
    //TODO: 에러 스테이트
    return <div>Error...</div>;
  }

  if (!categoryList) {
    return <div>Empty...</div>;
  }

  return (
    <div className="flex">
      <CategoryContainer categoryList={categoryList} />
      <TimelineContainer
        taskList={categoryList.map((category) => category.tasks)}
      />
    </div>
  );
};

export default KanbanBoard;
