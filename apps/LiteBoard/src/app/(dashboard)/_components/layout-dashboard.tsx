import { Header, Sidebar } from '@/app/_components/layout';
import { ProjectHeader } from '@/app/_components/project-header';

const LayoutDashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative grid grid-cols-[92px_1fr] grid-rows-[auto_1fr] h-screen">
      <Header />
      <nav className="fixed bottom-0 z-10 col-start-1 row-span-2 row-start-1 h-[calc(100vh-56px)] bg-neutral-50 border-r border-neutral-100 w-[92px] px-4 py-6">
        <Sidebar />
      </nav>
      <div className="flex col-start-2 row-start-2 bg-neutral-white pt-[88px] overflow-hidden">
        <main className="flex flex-col w-full h-full">
          <div className="pr-7 pb-12 pl-11">
            <ProjectHeader />
          </div>
          <div className="flex-1 h-full">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default LayoutDashboard;
