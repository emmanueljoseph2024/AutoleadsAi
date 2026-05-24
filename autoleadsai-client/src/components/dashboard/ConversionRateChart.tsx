import { FiTrendingUp } from 'react-icons/fi';

interface ConversionRateChartProps {
  emailRate: number;
  emailChange: number;
  socialRate: number;
  socialChange: number;
  loading?: boolean;
}

const ConversionRateChart = ({
  emailRate,
  emailChange,
  socialRate,
  socialChange,
  loading = false,
}: ConversionRateChartProps) => {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-6">
        <div className="h-5 w-32 bg-[#F3F4F6] rounded animate-shimmer relative overflow-hidden mb-4">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/50 to-transparent" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-[#F9FAFB] rounded-xl p-4 space-y-2">
              <div className="h-8 w-8 bg-[#F3F4F6] rounded-lg animate-shimmer relative overflow-hidden mx-auto">
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/50 to-transparent" />
              </div>
              <div className="h-4 w-16 bg-[#F3F4F6] rounded animate-shimmer relative overflow-hidden mx-auto">
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/50 to-transparent" />
              </div>
              <div className="h-6 w-12 bg-[#F3F4F6] rounded animate-shimmer relative overflow-hidden mx-auto">
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/50 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-bold text-[#111827] mb-4">Conversion Rate</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#F9FAFB] rounded-xl p-4 text-center">
          <div className="w-8 h-8 bg-[#DCFCE7] rounded-lg flex items-center justify-center mx-auto mb-2">
            <FiTrendingUp className="w-4 h-4 text-[#22C55E]" />
          </div>
          <p className="text-xs text-[#6B7280] mb-1">Email Outreach</p>
          <p className="text-xl sm:text-2xl font-bold text-[#111827]">{emailRate}%</p>
          <p className="text-xs text-[#9CA3AF] mt-1">vs last 7 days</p>
          <p className="text-sm font-semibold text-[#22C55E]">
            {emailChange >= 0 ? '+' : ''}{emailChange}%
          </p>
        </div>
        <div className="bg-[#F9FAFB] rounded-xl p-4 text-center">
          <div className="w-8 h-8 bg-[#FEF3C7] rounded-lg flex items-center justify-center mx-auto mb-2">
            <FiTrendingUp className="w-4 h-4 text-[#F59E0B]" />
          </div>
          <p className="text-xs text-[#6B7280] mb-1">Social Media</p>
          <p className="text-xl sm:text-2xl font-bold text-[#111827]">{socialRate}%</p>
          <p className="text-xs text-[#9CA3AF] mt-1">vs last 7 days</p>
          <p className="text-sm font-semibold text-[#22C55E]">
            {socialChange >= 0 ? '+' : ''}{socialChange}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversionRateChart;
