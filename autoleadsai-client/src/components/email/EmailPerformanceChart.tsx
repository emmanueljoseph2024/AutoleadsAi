// src/components/email/EmailPerformanceChart.tsx

import { FiTrendingUp, FiTrendingDown, FiMoreHorizontal } from 'react-icons/fi';
import { SkeletonChart } from '../common/Skeleton';

interface DailyStat {
  date: string;
  sent: number;
  opened: number;
  replied: number;
}

interface EmailPerformanceChartProps {
  dailyStats: DailyStat[];
  loading?: boolean;
}

const EmailPerformanceChart = ({ dailyStats, loading = false }: EmailPerformanceChartProps) => {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-6">
        <div className="h-5 w-36 bg-[#F3F4F6] rounded animate-shimmer relative overflow-hidden mb-4">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </div>
        <SkeletonChart />
      </div>
    );
  }

  if (dailyStats.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-bold text-[#111827] mb-4">Email Performance</h3>
        <div className="text-center py-8">
          <FiTrendingUp className="w-8 h-8 text-[#D1D5DB] mx-auto mb-2" />
          <p className="text-sm text-[#9CA3AF]">No email data yet</p>
        </div>
      </div>
    );
  }

  const maxSent = Math.max(...dailyStats.map((d) => d.sent), 1);

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base sm:text-lg font-bold text-[#111827]">Email Performance</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#2563EB]" />
            <span className="text-[10px] sm:text-xs text-[#6B7280]">Sent</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
            <span className="text-[10px] sm:text-xs text-[#6B7280]">Opened</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#4F46E5]" />
            <span className="text-[10px] sm:text-xs text-[#6B7280]">Replied</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-48 sm:h-56">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-6 w-8 flex flex-col justify-between text-[10px] text-[#9CA3AF]">
          <span>{maxSent}</span>
          <span>{Math.round(maxSent / 2)}</span>
          <span>0</span>
        </div>

        {/* Bars */}
        <div className="ml-8 h-full flex items-end gap-1 sm:gap-2">
          {dailyStats.map((day) => {
            const sentHeight = (day.sent / maxSent) * 100;
            const openedHeight = (day.opened / maxSent) * 100;
            const repliedHeight = (day.replied / maxSent) * 100;

            return (
              <div key={day.date} className="grow flex flex-col items-center gap-1 justify-end h-full">
                <div className="w-full flex items-end gap-[2px]">
                  {/* Sent bar */}
                  <div className="grow bg-[#EFF6FF] rounded-t-sm overflow-hidden" style={{ height: `${Math.max(sentHeight, 2)}%` }}>
                    <div className="w-full h-full bg-[#2563EB] rounded-t-sm transition-all duration-300 hover:opacity-80" />
                  </div>
                  {/* Opened bar */}
                  <div className="grow bg-[#DCFCE7] rounded-t-sm overflow-hidden" style={{ height: `${Math.max(openedHeight, 2)}%` }}>
                    <div className="w-full h-full bg-[#22C55E] rounded-t-sm transition-all duration-300 hover:opacity-80" />
                  </div>
                  {/* Replied bar */}
                  <div className="grow bg-[#EEF2FF] rounded-t-sm overflow-hidden" style={{ height: `${Math.max(repliedHeight, 2)}%` }}>
                    <div className="w-full h-full bg-[#4F46E5] rounded-t-sm transition-all duration-300 hover:opacity-80" />
                  </div>
                </div>
                <span className="text-[10px] text-[#9CA3AF]">
                  {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EmailPerformanceChart;