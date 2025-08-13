import AddTask from '../_components/add-task';
import CategoryContainer from './_components/organisms/category/category-container';
import TimelineContainer from './_components/organisms/timeline/timeline-container';

export default async function TeamPage() {
  return (
    <div className="flex flex-col gap-8 justify-end h-full">
      <AddTask />
      <div className="flex">
        <CategoryContainer />
        <TimelineContainer />
      </div>
    </div>
  );
}
