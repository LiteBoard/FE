import DashboardSummary from "node_modules/@LiteBoard/ui/src/components/DashboardSummary/DashboardSummary";

export default function MyWorkPage() {
  return (<div className="relative">
    <DashboardSummary 
      total={100}
      completed={6}
      pending={4}
      userName="홍길동"
    />
    <div className="absolute mt-[36px] h-[12px] bg-neutral-100 -left-11 -right-11"></div>
  </div>);
}
