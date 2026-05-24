import { Link } from 'react-router-dom';
import { FiMoreHorizontal } from 'react-icons/fi';
import { SkeletonChart } from '../common/Skeleton';

interface PipelineStage {
  status: string;
  count: number;
  link: string;
}

interface PipelineChartProps {
  stages: PipelineStage[];
  loading?: boolean;
}

const colors = ['bg-[#9CA3AF]', 'bg-[#06B6D4]', 'bg-[#2563EB]', 'bg-[#4F46E5]', 'bg-[#22C55E]'];

const PipelineChart = ({ stages, loading = false }: PipelineChartProps) => {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="h-5 w-32 bg-[#F3F4F6] rounded animate-shimmer relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/50 to-transparent" />
          </div>
        </div>
        <SkeletonChart />
      </div>
    );
  }

  if (stages.length === 0) return null;

  const maxCount = Math.max(...stages.map((s) => s.count), 1);

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base sm:text-lg font-bold text-[#111827]">Lead Pipeline</h3>
        <FiMoreHorizontal className="w-4 h-4 text-[#9CA3AF]" />
      </div>
      <div className="space-y-3">
        {stages.map((stage, i) => {
          const width = (stage.count / maxCount) * 100;
          return (
            <Link
              key={stage.status}
              to={stage.link}
              className="flex items-center gap-3 group"
            >
              <span className="text-xs sm:text-sm text-[#374151] w-20 sm:w-24 shrink-0 capitalize">
                {stage.status.replace(/_/g, ' ')}
              </span>
              <div className="grow bg-[#F3F4F6] rounded-full h-5 sm:h-6 overflow-hidden">
                <div
                  className={`h-full ${colors[i % colors.length]} rounded-full transition-all duration-500 group-hover:opacity-80 flex items-center justify-end pr-2`}
                  style={{ width: `${Math.max(width, 8)}%` }}
                >
                  {width > 15 && (
                    <span className="text-[10px] sm:text-xs text-white font-medium">
                      {stage.count.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
              {width <= 15 && (
                <span className="text-xs text-[#6B7280] shrink-0">{stage.count}</span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default PipelineChart;
