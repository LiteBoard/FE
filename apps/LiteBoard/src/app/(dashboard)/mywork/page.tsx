import { DashboardSummary } from '@LiteBoard/ui';

export default function MyWorkPage() {
  return (
    <div className="relative pl-11">
      <DashboardSummary
        total={100}
        completed={6}
        pending={4}
        userName="홍길동"
      />
      <div className="absolute mt-[36px] h-[12px] bg-neutral-100 -left-11 -right-11"></div>
    </div>
  );
}
