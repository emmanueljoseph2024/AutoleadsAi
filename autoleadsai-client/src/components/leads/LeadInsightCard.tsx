// src/components/leads/LeadInsightCard.tsx

import { FiCpu, FiTarget, FiMessageSquare } from 'react-icons/fi';
import Badge from '../common/Badge';
import { sanitizeString } from '../../utils/sanitizers';
import { formatDate } from '../../utils/formatDate';

interface Insight {
  _id: string;
  type: 'lead_analysis' | 'approach_strategy' | 'message_template' | 'category_analysis';
  title: string;
  content: string;
  suggestedMessage?: string;
  tone?: string;
  keyPoints: string[];
  leadCategory?: string;
  confidence: number;
  createdAt: string;
}

interface LeadInsightCardProps {
  insight: Insight;
}

const typeIcons: Record<string, React.ReactNode> = {
  lead_analysis: <FiTarget className="w-4 h-4 text-[#2563EB]" />,
  approach_strategy: <FiCpu className="w-4 h-4 text-[#4F46E5]" />,
  message_template: <FiMessageSquare className="w-4 h-4 text-[#06B6D4]" />,
  category_analysis: <FiCpu className="w-4 h-4 text-[#22C55E]" />,
};

const typeLabels: Record<string, string> = {
  lead_analysis: 'Lead Analysis',
  approach_strategy: 'Approach Strategy',
  message_template: 'Message Template',
  category_analysis: 'Category Analysis',
};

const toneBadges: Record<string, 'success' | 'warning' | 'info' | 'neutral'> = {
  professional: 'info',
  friendly: 'success',
  casual: 'neutral',
  formal: 'warning',
  direct: 'warning',
};

const LeadInsightCard = ({ insight }: LeadInsightCardProps) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-5 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#EFF6FF] rounded-lg flex items-center justify-center shrink-0">
            {typeIcons[insight.type] || typeIcons.lead_analysis}
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#111827]">
              {sanitizeString(insight.title)}
            </h4>
            <p className="text-xs text-[#9CA3AF]">{typeLabels[insight.type] || insight.type}</p>
          </div>
        </div>
        <Badge variant="info" size="sm">
          {insight.confidence}% confidence
        </Badge>
      </div>

      {/* Content */}
      <p className="text-sm text-[#374151] leading-relaxed mb-3">
        {sanitizeString(insight.content)}
      </p>

      {/* Key Points */}
      {insight.keyPoints.length > 0 && (
        <div className="mb-3">
          <p className="text-xs font-medium text-[#6B7280] mb-1.5">Key Points</p>
          <ul className="space-y-1">
            {insight.keyPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-[#374151]">
                <span className="w-1 h-1 bg-[#2563EB] rounded-full mt-1.5 shrink-0" />
                {sanitizeString(point)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggested Message */}
      {insight.suggestedMessage && (
        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-3 mb-3">
          <p className="text-xs font-medium text-[#6B7280] mb-1.5">Suggested Message</p>
          <p className="text-sm text-[#374151] italic">
            "{sanitizeString(insight.suggestedMessage)}"
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center gap-2">
        {insight.tone && (
          <Badge variant={toneBadges[insight.tone] || 'neutral'} size="sm">
            {insight.tone}
          </Badge>
        )}
        {insight.leadCategory && (
          <Badge variant="neutral" size="sm">
            {insight.leadCategory}
          </Badge>
        )}
        <span className="text-[10px] text-[#9CA3AF] ml-auto">
          {formatDate(insight.createdAt, 'relative')}
        </span>
      </div>
    </div>
  );
};

export default LeadInsightCard;