import { Link } from 'react-router-dom';
import { FiExternalLink } from 'react-icons/fi';
import { sanitizeString } from '../../utils/sanitizers';
import { SkeletonTable } from '../common/Skeleton';

interface LeadSample {
  _id: string;
  name: string;
  email: string;
  company: string;
  source: string;
  qualification: string;
  status: string;
  intent?: { score: number };
  createdAt: string;
}

interface RecentLeadsTableProps {
  leads: LeadSample[];
  loading?: boolean;
  maxRows?: number;
}

const qualificationBadges: Record<string, string> = {
  hot: 'bg-[#FEE2E2] text-[#EF4444]',
  warm: 'bg-[#FEF3C7] text-[#F59E0B]',
  cold: 'bg-[#EFF6FF] text-[#2563EB]',
};

const statusBadges: Record<string, string> = {
  new: 'bg-[#F3F4F6] text-[#6B7280]',
  scored: 'bg-[#EFF6FF] text-[#2563EB]',
  qualified: 'bg-[#EEF2FF] text-[#4F46E5]',
  contacted: 'bg-[#FEF3C7] text-[#F59E0B]',
  replied: 'bg-[#DCFCE7] text-[#22C55E]',
  converted: 'bg-[#DCFCE7] text-[#22C55E]',
};

const RecentLeadsTable = ({ leads, loading = false, maxRows = 5 }: RecentLeadsTableProps) => {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="h-5 w-36 bg-[#F3F4F6] rounded animate-shimmer relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/50 to-transparent" />
          </div>
        </div>
        <SkeletonTable rows={maxRows} />
      </div>
    );
  }

  if (leads.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base sm:text-lg font-bold text-[#111827]">🔥 Hot Leads This Week</h3>
        <Link
          to="/leads?qualification=hot"
          className="text-xs sm:text-sm text-[#2563EB] hover:underline font-medium inline-flex items-center gap-1"
        >
          View All <FiExternalLink className="w-3 h-3" />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs text-[#9CA3AF] border-b border-[#E5E7EB]">
              <th className="pb-3 font-medium">Name</th>
              <th className="pb-3 font-medium hidden sm:table-cell">Company</th>
              <th className="pb-3 font-medium hidden md:table-cell">Source</th>
              <th className="pb-3 font-medium">Score</th>
              <th className="pb-3 font-medium hidden lg:table-cell">Status</th>
            </tr>
          </thead>
          <tbody>
            {leads.slice(0, maxRows).map((lead) => (
              <tr
                key={lead._id}
                className="border-b border-[#F3F4F6] hover:bg-[#F9FAFB] transition-colors"
              >
                <td className="py-3">
                  <Link
                    to={`/leads/${lead._id}`}
                    className="text-sm font-medium text-[#111827] hover:text-[#2563EB] transition-colors"
                  >
                    {sanitizeString(lead.name || 'Unknown')}
                  </Link>
                </td>
                <td className="py-3 text-sm text-[#6B7280] hidden sm:table-cell">
                  {sanitizeString(lead.company || '-')}
                </td>
                <td className="py-3 hidden md:table-cell">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#EFF6FF] text-[#2563EB] rounded-lg text-xs font-medium capitalize">
                    {sanitizeString(lead.source)}
                  </span>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-12 sm:w-16 bg-[#F3F4F6] rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full bg-[#22C55E] rounded-full transition-all duration-300"
                        style={{ width: `${lead.intent?.score || 0}%` }}
                      />
                    </div>
                    <span className="text-xs text-[#6B7280]">{lead.intent?.score || 0}</span>
                  </div>
                </td>
                <td className="py-3 hidden lg:table-cell">
                  <span
                    className={`px-2 py-0.5 rounded-lg text-xs font-medium capitalize ${
                      statusBadges[lead.status] || 'bg-[#F3F4F6] text-[#6B7280]'
                    }`}
                  >
                    {lead.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentLeadsTable;
