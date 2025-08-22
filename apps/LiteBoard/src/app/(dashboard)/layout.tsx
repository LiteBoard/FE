import LayoutDashboard from './_components/layout-dashboard';
import { ProjectProvider } from '@/providers/ProjectProvider';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProjectProvider>
      <LayoutDashboard>{children}</LayoutDashboard>
    </ProjectProvider>
  );
}
