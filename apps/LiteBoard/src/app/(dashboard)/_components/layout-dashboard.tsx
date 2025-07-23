'use client';

import { Header, Sidebar } from '@/app/_components/layout';
import { ProjectHeader } from '@/app/_components/project-header';

const LayoutDashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative grid grid-cols-[92px_1fr] grid-rows-[auto_1fr] h-screen">
      <Header />
      <nav className="fixed bottom-0 z-10 col-start-1 row-span-2 row-start-1 h-[calc(100vh-56px)] bg-neutral-50 border-r border-neutral-100 w-[92px] px-4 py-6">
        <Sidebar />
      </nav>
      <div className="flex col-start-2 row-start-2 justify-center bg-neutral-white pt-[88px] pl-11">
        <main className="pr-7 w-full h-full">
          <ProjectHeader />
          <div className="mt-12">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default LayoutDashboard;
