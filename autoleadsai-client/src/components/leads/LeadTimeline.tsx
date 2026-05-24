// src/components/leads/LeadTimeline.tsx

import { FiMail, FiEye, FiMessageSquare, FiCheckCircle, FiClock } from 'react-icons/fi';
import { formatDate } from '../../utils/formatDate';
import { sanitizeString } from '../../utils/sanitizers';

interface TimelineEvent {
  type: 'email_sent' | 'email_opened' | 'email_replied' | 'status_change' | 'lead_created';
  title: string;
  description?: string;
  timestamp: string;
  status?: string;
}

interface LeadTimelineProps {
  events: TimelineEvent[];
}

const eventIcons: Record<string, React.ReactNode> = {
  email_sent: <FiMail className="w-3.5 h-3.5 text-[#2563EB]" />,
  email_opened: <FiEye className="w-3.5 h-3.5 text-[#06B6D4]" />,
  email_replied: <FiMessageSquare className="w-3.5 h-3.5 text-[#22C55E]" />,
  status_change: <FiCheckCircle className="w-3.5 h-3.5 text-[#4F46E5]" />,
  lead_created: <FiClock className="w-3.5 h-3.5 text-[#9CA3AF]" />,
};

const eventColors: Record<string, string> = {
  email_sent: 'bg-[#EFF6FF]',
  email_opened: 'bg-[#ECFEFF]',
  email_replied: 'bg-[#DCFCE7]',
  status_change: 'bg-[#EEF2FF]',
  lead_created: 'bg-[#F3F4F6]',
};

const LeadTimeline = ({ events }: LeadTimelineProps) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-8">
        <FiClock className="w-8 h-8 text-[#D1D5DB] mx-auto mb-2" />
        <p className="text-sm text-[#9CA3AF]">No activity yet</p>
      </div>
    );
  }

  return (
    <div className="relative pl-6 space-y-0">
      {/* Vertical line */}
      <div className="absolute left-[15px] top-0 bottom-0 w-px bg-[#E5E7EB]" />

      {events.map((event, index) => (
        <div key={index} className="relative pb-5 last:pb-0">
          {/* Dot */}
          <div
            className={`absolute -left-[21px] top-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${
              eventColors[event.type] || 'bg-[#F3F4F6]'
            }`}
          >
            {eventIcons[event.type] || eventIcons.lead_created}
          </div>

          {/* Content */}
          <div>
            <p className="text-sm font-medium text-[#111827]">
              {sanitizeString(event.title)}
            </p>
            {event.description && (
              <p className="text-xs text-[#6B7280] mt-0.5">
                {sanitizeString(event.description)}
              </p>
            )}
            <p className="text-[10px] text-[#9CA3AF] mt-1">
              {formatDate(event.timestamp, 'relative')}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeadTimeline;