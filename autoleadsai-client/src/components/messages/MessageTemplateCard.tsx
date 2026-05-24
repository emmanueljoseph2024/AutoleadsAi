// src/components/messages/MessageTemplateCard.tsx

import { FiCopy, FiCheck, FiStar, FiExternalLink } from 'react-icons/fi';
import Badge from '../common/Badge';
import CopyButton from '../common/CopyButton';
import { sanitizeString } from '../../utils/sanitizers';
import { formatDate } from '../../utils/formatDate';

interface MessageTemplate {
  _id: string;
  leadId?: {
    _id: string;
    name: string;
  };
  platform: string;
  type: string;
  body: string;
  tone: string;
  subject?: string;
  keyValueProps: string[];
  userRating?: number;
  isUsed: boolean;
  createdAt: string;
}

interface MessageTemplateCardProps {
  template: MessageTemplate;
  onClick?: (template: MessageTemplate) => void;
}

const platformLabels: Record<string, string> = {
  linkedin: 'LinkedIn',
  facebook: 'Facebook',
  twitter: 'X',
  instagram: 'Instagram',
  email: 'Email',
};

const platformColors: Record<string, string> = {
  linkedin: 'bg-[#E8F0FE] text-[#0A66C2]',
  facebook: 'bg-[#E7F0FD] text-[#1877F2]',
  twitter: 'bg-[#F3F4F6] text-[#111827]',
  instagram: 'bg-[#FDE8EC] text-[#E4405F]',
  email: 'bg-[#EFF6FF] text-[#2563EB]',
};

const typeLabels: Record<string, string> = {
  initial_contact: 'Initial Contact',
  follow_up: 'Follow-up',
  value_pitch: 'Value Pitch',
  objection_response: 'Objection Response',
  closing: 'Closing',
};

const toneBadges: Record<string, 'success' | 'warning' | 'info' | 'neutral'> = {
  professional: 'info',
  friendly: 'success',
  casual: 'neutral',
  formal: 'warning',
  direct: 'warning',
};

const MessageTemplateCard = ({ template, onClick }: MessageTemplateCardProps) => {
  const preview = template.body.slice(0, 120) + (template.body.length > 120 ? '...' : '');

  return (
    <div
      onClick={() => onClick?.(template)}
      className={`bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-5 hover:shadow-md transition-all duration-200 group ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Badge variant="neutral" size="sm" className={platformColors[template.platform]}>
            {platformLabels[template.platform] || template.platform}
          </Badge>
          <Badge variant={toneBadges[template.tone] || 'neutral'} size="sm">
            {template.tone}
          </Badge>
        </div>
        <div className="flex items-center gap-1">
          {template.userRating && (
            <div className="flex items-center gap-0.5 text-[#F59E0B]">
              <FiStar className="w-3 h-3 fill-current" />
              <span className="text-xs font-medium">{template.userRating}</span>
            </div>
          )}
          <Badge variant="neutral" size="sm">
            {typeLabels[template.type] || template.type}
          </Badge>
        </div>
      </div>

      {/* Body Preview */}
      <p className="text-sm text-[#374151] leading-relaxed mb-3 whitespace-pre-wrap">
        {sanitizeString(preview)}
      </p>

      {/* Key Value Props */}
      {template.keyValueProps.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {template.keyValueProps.slice(0, 3).map((prop, i) => (
            <span
              key={i}
              className="px-2 py-0.5 bg-[#F3F4F6] text-[#6B7280] rounded-full text-[10px] font-medium"
            >
              {sanitizeString(prop)}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="min-w-0">
          {template.leadId && (
            <p className="text-xs text-[#6B7280] truncate">
              For: {sanitizeString(template.leadId.name || 'Unknown')}
            </p>
          )}
          <p className="text-[10px] text-[#9CA3AF] mt-0.5">
            {formatDate(template.createdAt, 'relative')}
          </p>
        </div>
        <CopyButton text={template.body} />
      </div>

      {template.subject && (
        <div className="mt-2 pt-2 border-t border-[#E5E7EB]">
          <p className="text-xs text-[#9CA3AF]">
            Subject: <span className="text-[#374151]">{sanitizeString(template.subject)}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default MessageTemplateCard;