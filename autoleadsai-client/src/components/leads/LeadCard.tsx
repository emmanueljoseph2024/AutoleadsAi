// src/components/leads/LeadCard.tsx

import { Link } from 'react-router-dom';
import { FiMail, FiExternalLink, FiMapPin } from 'react-icons/fi';
import Badge from '../common/Badge';
import SourceBadge from '../common/SourceBadge';
import CopyButton from '../common/CopyButton';
import { sanitizeString } from '../../utils/sanitizers';
import { formatDate } from '../../utils/formatDate';

interface Lead {
  _id: string;
  name: string;
  email: string;
  company: string;
  source: string;
  sourceUrl: string;
  qualification: 'hot' | 'warm' | 'cold';
  status: string;
  intent?: { score: number };
  relevance?: { score: number };
  createdAt: string;
}

interface LeadCardProps {
  lead: Lead;
  onClick?: (lead: Lead) => void;
}

const qualificationBadges: Record<string, 'danger' | 'warning' | 'info'> = {
  hot: 'danger',
  warm: 'warning',
  cold: 'info',
};

const LeadCard = ({ lead, onClick }: LeadCardProps) => {
  return (
    <div
      onClick={() => onClick?.(lead)}
      className={`bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-5 hover:shadow-md transition-all duration-200 group ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="min-w-0">
          <Link
            to={`/leads/${lead._id}`}
            className="text-sm font-semibold text-[#111827] hover:text-[#2563EB] transition-colors truncate block"
            onClick={(e) => e.stopPropagation()}
          >
            {sanitizeString(lead.name || 'Unknown Lead')}
          </Link>
          <div className="flex items-center gap-1.5 mt-1">
            <FiMail className="w-3 h-3 text-[#9CA3AF]" />
            <span className="text-xs text-[#6B7280] truncate">{sanitizeString(lead.email)}</span>
            <CopyButton text={lead.email} />
          </div>
        </div>
        <Badge variant={qualificationBadges[lead.qualification] || 'neutral'} size="sm">
          {lead.qualification}
        </Badge>
      </div>

      {/* Company & Source */}
      <div className="flex items-center gap-2 mb-3">
        {lead.company && (
          <span className="text-xs text-[#6B7280] flex items-center gap-1">
            <FiMapPin className="w-3 h-3" />
            {sanitizeString(lead.company)}
          </span>
        )}
        <SourceBadge source={lead.source} size="sm" />
      </div>

      {/* Score Bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-[#9CA3AF]">Intent Score</span>
          <span className="font-medium text-[#111827]">{lead.intent?.score || 0}/100</span>
        </div>
        <div className="w-full bg-[#F3F4F6] rounded-full h-1.5 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              (lead.intent?.score || 0) >= 80
                ? 'bg-[#22C55E]'
                : (lead.intent?.score || 0) >= 50
                ? 'bg-[#F59E0B]'
                : 'bg-[#EF4444]'
            }`}
            style={{ width: `${lead.intent?.score || 0}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-[#9CA3AF]">
          {formatDate(lead.createdAt, 'relative')}
        </span>
        {lead.sourceUrl && (
          <a
            href={lead.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-xs text-[#2563EB] hover:underline inline-flex items-center gap-1"
          >
            View Source <FiExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
};

export default LeadCard;