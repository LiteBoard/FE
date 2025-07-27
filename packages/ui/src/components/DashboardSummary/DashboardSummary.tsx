import SummaryCard from './SummaryCard';

interface DashboardSummaryProps {
  total: number;
  completed: number;
  pending: number;
  userName: string;
}

export default function DashboardSummary({
  total,
  completed,
  pending,
  userName,
}: DashboardSummaryProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">
        안녕하세요, <span className="font-bold">{userName} 님!</span>
      </h2>
      <div className="flex gap-6">
        <SummaryCard label="전체 To-do" count={total} />
        <SummaryCard label="미완료" count={pending} color="red" />
        <SummaryCard label="완료" count={completed} color="blue" />
      </div>
    </div>
  );
}
