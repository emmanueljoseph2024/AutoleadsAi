import { FiMail, FiTrendingUp, FiMoreHorizontal } from 'react-icons/fi';

interface EmailPerformanceCardProps {
  sent: number;
  opened: number;
  replied: number;
  openRate: string;
  replyRate: string;
  loading?: boolean;
}

const EmailPerformanceCard = ({
  sent,
  opened,
  replied,
  openRate,
  replyRate,
  loading = false,
}: EmailPerformanceCardProps) => {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-6 space-y-4">
        <div className="h-5 w-36 bg-[#F3F4F6] rounded animate-shimmer relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/50 to-transparent" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-1.5">
              <div className="h-3 w-12 bg-[#F3F4F6] rounded animate-shimmer relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/50 to-transparent" />
              </div>
              <div className="h-6 w-8 bg-[#F3F4F6] rounded animate-shimmer relative overflow-hidden">
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
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base sm:text-lg font-bold text-[#111827]">Email Performance</h3>
        <FiMoreHorizontal className="w-4 h-4 text-[#9CA3AF]" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#F9FAFB] rounded-xl p-3 text-center">
          <div className="w-8 h-8 bg-[#EFF6FF] rounded-lg flex items-center justify-center mx-auto mb-2">
            <FiMail className="w-4 h-4 text-[#2563EB]" />
          </div>
          <p className="text-xs text-[#6B7280]">Sent</p>
          <p className="text-lg font-bold text-[#111827]">{sent}</p>
        </div>
        <div className="bg-[#F9FAFB] rounded-xl p-3 text-center">
          <div className="w-8 h-8 bg-[#DCFCE7] rounded-lg flex items-center justify-center mx-auto mb-2">
            <FiTrendingUp className="w-4 h-4 text-[#22C55E]" />
          </div>
          <p className="text-xs text-[#6B7280]">Opened</p>
          <p className="text-lg font-bold text-[#111827]">{opened}</p>
        </div>
        <div className="bg-[#F9FAFB] rounded-xl p-3 text-center">
          <div className="w-8 h-8 bg-[#ECFEFF] rounded-lg flex items-center justify-center mx-auto mb-2">
            <FiTrendingUp className="w-4 h-4 text-[#06B6D4]" />
          </div>
          <p className="text-xs text-[#6B7280]">Replied</p>
          <p className="text-lg font-bold text-[#111827]">{replied}</p>
        </div>
        <div className="bg-[#F9FAFB] rounded-xl p-3 text-center">
          <div className="w-8 h-8 bg-[#FEF3C7] rounded-lg flex items-center justify-center mx-auto mb-2">
            <span className="text-sm font-bold text-[#F59E0B]">%</span>
          </div>
          <p className="text-xs text-[#6B7280]">Reply Rate</p>
          <p className="text-lg font-bold text-[#111827]">{replyRate}%</p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#6B7280]">Open Rate</span>
          <span className="font-semibold text-[#111827]">{openRate}%</span>
        </div>
        <div className="w-full bg-[#F3F4F6] rounded-full h-2 mt-2 overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-[#2563EB] to-[#06B6D4] rounded-full transition-all duration-500"
            style={{ width: `${Math.min(parseFloat(openRate) || 0, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default EmailPerformanceCard;
