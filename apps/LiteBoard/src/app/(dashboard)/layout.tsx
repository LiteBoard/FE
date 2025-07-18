import LayoutDashboard from './_components/layout-dashboard';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutDashboard>{children}</LayoutDashboard>;
}
