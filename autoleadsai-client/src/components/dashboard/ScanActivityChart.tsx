import { FiMoreHorizontal, FiBarChart2 } from 'react-icons/fi';

interface ScanDataPoint {
  date: string;
  scans: number;
  totalLeads: number;
}

interface ScanActivityChartProps {
  data: ScanDataPoint[];
  loading?: boolean;
}

const ScanActivityChart = ({ data, loading = false }: ScanActivityChartProps) => {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-6">
        <div className="h-5 w-36 bg-[#F3F4F6] rounded animate-shimmer relative overflow-hidden mb-4">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/50 to-transparent" />
        </div>
        <div className="flex items-end gap-2 h-36">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div
              key={i}
              className="grow bg-[#F3F4F6] rounded-t animate-shimmer relative overflow-hidden"
              style={{ height: `${20 + Math.random() * 60}%` }}
            >
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/50 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-bold text-[#111827] mb-4">Scan Activity</h3>
        <div className="text-center py-8">
          <FiBarChart2 className="w-8 h-8 text-[#D1D5DB] mx-auto mb-2" />
          <p className="text-sm text-[#9CA3AF]">No scan data yet</p>
        </div>
      </div>
    );
  }

  const maxScans = Math.max(...data.map((d) => d.scans), 1);

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base sm:text-lg font-bold text-[#111827]">Scan Activity</h3>
        <FiMoreHorizontal className="w-4 h-4 text-[#9CA3AF]" />
      </div>
      <div className="flex items-end gap-1.5 sm:gap-2 h-36">
        {data.map((point) => {
          const height = (point.scans / maxScans) * 100;
          return (
            <div key={point.date} className="grow flex flex-col items-center gap-1.5 h-full justify-end">
              <span className="text-[10px] text-[#9CA3AF]">{point.scans}</span>
              <div className="w-full bg-[#EFF6FF] rounded-t-md overflow-hidden" style={{ height: `${Math.max(height, 4)}%` }}>
                <div className="w-full h-full bg-linear-to-t from-[#2563EB] to-[#4F46E5] rounded-t-md transition-all duration-300 hover:opacity-80" />
              </div>
              <span className="text-[10px] text-[#9CA3AF]">
                {new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScanActivityChart;
