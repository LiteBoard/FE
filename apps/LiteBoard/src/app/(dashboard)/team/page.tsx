import AddTask from '../_components/add-task';
import KanbanBoard from './_components/KanbanBoard';
import TaskDetailPanel from './_components/TaskDetailPanel';

export default async function TeamPage() {
  return (
    <div className="flex flex-col gap-8 justify-end h-full">
      <AddTask />
      <KanbanBoard />
      <TaskDetailPanel />
    </div>
  );
}
