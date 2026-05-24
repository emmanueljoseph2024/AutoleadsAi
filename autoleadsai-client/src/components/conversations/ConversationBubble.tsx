import { FiUser, FiCpu } from 'react-icons/fi';
import { formatDate } from '../../utils/formatDate';
import { sanitizeString } from '../../utils/sanitizers';

interface Message {
  direction: 'inbound' | 'outbound';
  content: string;
  senderName?: string;
  aiGenerated: boolean;
  confidence?: number;
  sentAt?: string;
  createdAt: string;
}

interface ConversationBubbleProps {
  message: Message;
  platform: string;
}

const ConversationBubble = ({ message }: ConversationBubbleProps) => {
  const isOutbound = message.direction === 'outbound';
  const sanitizedContent = sanitizeString(message.content);

  return (
    <div className={`flex ${isOutbound ? 'justify-end' : 'justify-start'} animate-slide-up`}>
      <div className={`max-w-[80%] sm:max-w-[70%]`}>
        {/* Sender Info */}
        {!isOutbound && message.senderName && (
          <p className="text-[10px] sm:text-xs text-[#9CA3AF] mb-1 flex items-center gap-1">
            <FiUser className="w-3 h-3" />
            {sanitizeString(message.senderName)}
          </p>
        )}

        {/* Bubble */}
        <div
          className={`
            px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-sm
            ${isOutbound
              ? message.aiGenerated
                ? 'bg-gradient-to-r from-[#EEF2FF] to-[#EFF6FF] text-[#374151] border border-[#2563EB]/20'
                : 'bg-gradient-to-r from-[#2563EB] to-[#4F46E5] text-white'
              : 'bg-white text-[#374151] border border-[#E5E7EB]'
            }
          `}
        >
          <p className="whitespace-pre-wrap break-words">{sanitizedContent}</p>
        </div>

        {/* Meta */}
        <div className={`flex items-center gap-2 mt-1 ${isOutbound ? 'justify-end' : 'justify-start'}`}>
          {message.aiGenerated && (
            <span className="text-[10px] text-[#6B7280] flex items-center gap-1">
              <FiCpu className="w-3 h-3" />
              AI
              {message.confidence !== undefined && ` • ${message.confidence}%`}
            </span>
          )}
          <span className="text-[10px] text-[#9CA3AF]">
            {formatDate(message.sentAt || message.createdAt, 'relative')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ConversationBubble;