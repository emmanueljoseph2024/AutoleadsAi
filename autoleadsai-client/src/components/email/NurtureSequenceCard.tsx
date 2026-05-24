// src/components/email/NurtureSequenceCard.tsx

import { Link } from 'react-router-dom';
import {
  FiMail,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiChevronRight,
} from 'react-icons/fi';
import Badge from '../common/Badge';
import { sanitizeString } from '../../utils/sanitizers';
import { formatDate } from '../../utils/formatDate';

interface NurtureStep {
  stepNumber: number;
  delayDays: number;
  emailSubject: string;
  status: 'pending' | 'sent' | 'delivered' | 'opened' | 'replied' | 'bounced';
  sentAt?: string;
  aiGenerated: boolean;
}

interface NurtureSequence {
  _id: string;
  leadId: {
    _id: string;
    name: string;
    email: string;
  };
  status: 'active' | 'paused' | 'conversation' | 'converted' | 'closed_lost' | 'closed_spam' | 'unsubscribed';
  currentStep: number;
  maxSteps: number;
  steps: NurtureStep[];
  conversionProbability: number;
  startedAt: string;
}

interface NurtureSequenceCardProps {
  sequence: NurtureSequence;
}

const statusConfig: Record<string, { variant: 'success' | 'warning' | 'danger' | 'info' | 'neutral'; label: string; icon: React.ReactNode }> = {
  active: { variant: 'info', label: 'Active', icon: <FiMail className="w-3 h-3" /> },
  paused: { variant: 'warning', label: 'Paused', icon: <FiClock className="w-3 h-3" /> },
  conversation: { variant: 'success', label: 'In Conversation', icon: <FiCheckCircle className="w-3 h-3" /> },
  converted: { variant: 'success', label: 'Converted', icon: <FiCheckCircle className="w-3 h-3" /> },
  closed_lost: { variant: 'neutral', label: 'Closed', icon: <FiXCircle className="w-3 h-3" /> },
  closed_spam: { variant: 'danger', label: 'Spam', icon: <FiAlertCircle className="w-3 h-3" /> },
  unsubscribed: { variant: 'neutral', label: 'Unsubscribed', icon: <FiXCircle className="w-3 h-3" /> },
};

const stepStatusIcons: Record<string, React.ReactNode> = {
  pending: <FiClock className="w-3 h-3 text-[#9CA3AF]" />,
  sent: <FiMail className="w-3 h-3 text-[#2563EB]" />,
  delivered: <FiCheckCircle className="w-3 h-3 text-[#06B6D4]" />,
  opened: <FiCheckCircle className="w-3 h-3 text-[#22C55E]" />,
  replied: <FiMail className="w-3 h-3 text-[#4F46E5]" />,
  bounced: <FiAlertCircle className="w-3 h-3 text-[#EF4444]" />,
};

const NurtureSequenceCard = ({ sequence }: NurtureSequenceCardProps) => {
  const config = statusConfig[sequence.status] || statusConfig.active;
  const progressPercent = sequence.maxSteps > 0
    ? Math.round((sequence.currentStep / sequence.maxSteps) * 100)
    : 0;

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-5 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="min-w-0">
          <Link
            to={`/leads/${sequence.leadId._id}`}
            className="text-sm font-semibold text-[#111827] hover:text-[#2563EB] transition-colors truncate block"
          >
            {sanitizeString(sequence.leadId.name || sequence.leadId.email)}
          </Link>
          <p className="text-xs text-[#9CA3AF] mt-0.5">
            Started {formatDate(sequence.startedAt, 'relative')}
          </p>
        </div>
        <Badge variant={config.variant} size="sm">
          <span className="flex items-center gap-1">
            {config.icon}
            {config.label}
          </span>
        </Badge>
      </div>

      {/* Progress */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-[#6B7280]">Progress</span>
          <span className="font-medium text-[#111827]">
            {sequence.currentStep}/{sequence.maxSteps} steps
          </span>
        </div>
        <div className="w-full bg-[#F3F4F6] rounded-full h-1.5 overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-[#2563EB] to-[#4F46E5] rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Steps Timeline */}
      <div className="space-y-1.5">
        {sequence.steps.slice(0, 4).map((step) => (
          <div key={step.stepNumber} className="flex items-center gap-2 text-xs">
            <span className="shrink-0">{stepStatusIcons[step.status] || stepStatusIcons.pending}</span>
            <span className="text-[#6B7280] truncate">
              Step {step.stepNumber}: {sanitizeString(step.emailSubject || `Email ${step.stepNumber}`)}
            </span>
            {step.aiGenerated && (
              <span className="text-[10px] text-[#9CA3AF] shrink-0">🤖 AI</span>
            )}
          </div>
        ))}
        {sequence.steps.length > 4 && (
          <p className="text-xs text-[#9CA3AF] pl-5">
            +{sequence.steps.length - 4} more steps
          </p>
        )}
      </div>

      {/* Conversion Probability */}
      {sequence.status === 'active' && (
        <div className="mt-3 pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
          <span className="text-xs text-[#6B7280]">Conversion probability</span>
          <span className="text-sm font-bold text-[#111827]">{sequence.conversionProbability}%</span>
        </div>
      )}

      {/* View Detail Link */}
      <Link
        to={`/leads/${sequence.leadId._id}`}
        className="mt-3 inline-flex items-center gap-1 text-xs text-[#2563EB] hover:underline font-medium"
      >
        View Lead Detail
        <FiChevronRight className="w-3 h-3" />
      </Link>
    </div>
  );
};

export default NurtureSequenceCard;