interface UsageMeterProps {
  label: string;
  used: number;
  limit: number | string;
  unit?: string;
  color?: string;
}

const UsageMeter = ({
  label,
  used,
  limit,
  unit = '',
  color = 'bg-[#2563EB]',
}: UsageMeterProps) => {
  const isUnlimited = typeof limit === 'string';
  const percentage = isUnlimited ? 0 : Math.min(100, Math.round((used / (limit as number)) * 100));

  const getColor = () => {
    if (isUnlimited) return 'bg-[#22C55E]';
    if (percentage >= 90) return 'bg-[#EF4444]';
    if (percentage >= 70) return 'bg-[#F59E0B]';
    return color;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs sm:text-sm text-[#374151] font-medium">{label}</span>
        <span className="text-xs sm:text-sm text-[#6B7280]">
          {used.toLocaleString()}{unit} / {isUnlimited ? 'Unlimited' : `${(limit as number).toLocaleString()}${unit}`}
        </span>
      </div>
      <div className="w-full bg-[#F3F4F6] rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${getColor()}`}
          style={{ width: isUnlimited ? '100%' : `${percentage}%` }}
        />
      </div>
      {!isUnlimited && percentage >= 80 && (
        <p className={`text-[10px] sm:text-xs mt-1.5 ${percentage >= 90 ? 'text-[#EF4444]' : 'text-[#F59E0B]'}`}>
          {percentage >= 100 ? 'Limit reached. Upgrade to continue.' : `Approaching limit — ${100 - percentage}% remaining`}
        </p>
      )}
    </div>
  );
};

export default UsageMeter;