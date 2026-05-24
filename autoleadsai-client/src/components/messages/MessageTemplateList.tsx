// src/components/messages/MessageTemplateList.tsx

import { FiMessageSquare } from 'react-icons/fi';
import EmptyState from '../common/EmptyState';
import MessageTemplateCard from './MessageTemplateCard';
import Skeleton  from '../common/Skeleton';

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

interface MessageTemplateListProps {
  templates: MessageTemplate[];
  loading?: boolean;
  onTemplateClick?: (template: MessageTemplate) => void;
}

const MessageTemplateList = ({
  templates,
  loading = false,
  onTemplateClick,
}: MessageTemplateListProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-2xl border border-[#E5E7EB] p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-14 rounded-full" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex items-center justify-between pt-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-8 w-8 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (templates.length === 0) {
    return (
      <EmptyState
        icon={<FiMessageSquare className="w-8 h-8" />}
        title="No message templates yet"
        description="Generate your first message to start reaching out to leads."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {templates.map((template) => (
        <MessageTemplateCard
          key={template._id}
          template={template}
          onClick={onTemplateClick}
        />
      ))}
    </div>
  );
};

export default MessageTemplateList;