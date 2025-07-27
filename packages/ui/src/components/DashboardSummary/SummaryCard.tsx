interface SummaryCardProps {
  label: string;
  count: number;
  color?: 'red' | 'blue';
}

export default function SummaryCard({ label, count, color }: SummaryCardProps) {
  const colorMap = {
    red: 'text-red-500',
    blue: 'text-blue-500',
    default: 'text-neutral-800',
  };

  const textColor = color ? colorMap[color] : colorMap.default;

  return (
    <div className="flex flex-row bg-neutral-100 rounded-3xl px-[32px] py-[28px] max-w-[265px] h-[148px] shadow-sm">
      <div className="flex gap-[44px] justify-between items-end w-full">
        <p className="text-neutral-500 text-text-B1M">{label}</p>
        <p className={`text-text-H1 ${textColor}`}>{count}</p>
      </div>
    </div>
  );
}
