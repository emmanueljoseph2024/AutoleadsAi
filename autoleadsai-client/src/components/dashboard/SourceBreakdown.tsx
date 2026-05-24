import { SkeletonChart } from '../common/Skeleton';

interface SourceItem {
  source: string;
  count: number;
  link: string;
}

interface SourceBreakdownProps {
  sources: SourceItem[];
  loading?: boolean;
}

const sourceColors: Record<string, string> = {
  linkedin: 'bg-[#0A66C2]',
  facebook: 'bg-[#1877F2]',
  reddit: 'bg-[#FF4500]',
  twitter: 'bg-[#111827]',
  instagram: 'bg-[#E4405F]',
  website: 'bg-[#4CAF50]',
  google_maps: 'bg-[#EA4335]',
  news: 'bg-[#FF9800]',
  manual: 'bg-[#9E9E9E]',
  api: 'bg-[#607D8B]',
};

const SourceBreakdown = ({ sources, loading = false }: SourceBreakdownProps) => {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-6">
        <div className="h-5 w-36 bg-[#F3F4F6] rounded animate-shimmer relative overflow-hidden mb-4">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/50 to-transparent" />
        </div>
        <SkeletonChart />
      </div>
    );
  }

  if (sources.length === 0) return null;

  const total = sources.reduce((sum, s) => sum + s.count, 0);

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-bold text-[#111827] mb-4">Leads by Source</h3>
      <div className="space-y-3">
        {sources.map((source) => {
          const percentage = total > 0 ? (source.count / total) * 100 : 0;
          return (
            <div key={source.source} className="flex items-center gap-3">
              <span className="text-xs sm:text-sm text-[#374151] w-20 sm:w-24 shrink-0 capitalize">
                {source.source.replace(/_/g, ' ')}
              </span>
              <div className="grow bg-[#F3F4F6] rounded-full h-4 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    sourceColors[source.source] || 'bg-[#9CA3AF]'
                  }`}
                  style={{ width: `${Math.max(percentage, 4)}%` }}
                />
              </div>
              <span className="text-xs text-[#6B7280] shrink-0">{source.count}</span>
              <span className="text-[10px] text-[#9CA3AF] shrink-0 w-10 text-right">
                {percentage.toFixed(1)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SourceBreakdown;
