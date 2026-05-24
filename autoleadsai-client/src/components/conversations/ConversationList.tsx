// src/components/conversations/ConversationList.tsx

import { useState, useEffect, useCallback } from 'react';
import { FiMessageSquare, FiAlertCircle } from 'react-icons/fi';
import { FaLinkedinIn, FaFacebookF, FaRedditAlien } from 'react-icons/fa';
import { SiX } from 'react-icons/si';
import { Link } from 'react-router-dom';
import SearchBar from '../common/SearchBar';
import Badge from '../common/Badge';
import EmptyState from '../common/EmptyState';
import Tabs from '../common/Tabs';
import ConversationStatus from './ConversationStatus';
import { SkeletonConversationRow } from '../common/Skeleton';
import { sanitizeString } from '../../utils/sanitizers';
import { API_ENDPOINTS } from '../../utils/constants';
import { formatDate } from '../../utils/formatDate';
import api from '../../services/api';

interface Conversation {
  _id: string;
  leadId?: { _id: string; name: string; email: string };
  platform: 'facebook' | 'instagram' | 'twitter' | 'linkedin';
  platformConversationId: string;
  status: 'active' | 'waiting' | 'human_needed' | 'closed' | 'spam';
  messages: {
    direction: 'inbound' | 'outbound';
    content: string;
    aiGenerated: boolean;
    createdAt: string;
  }[];
  aiEscalated: boolean;
  sentiment: string;
  intent: string;
  lastActivityAt: string;
  createdAt: string;
}

const platformIcons: Record<string, React.ReactNode> = {
  facebook: <FaFacebookF className="w-3 h-3" />,
  instagram: <FaFacebookF className="w-3 h-3" />,
  twitter: <SiX className="w-3 h-3" />,
  linkedin: <FaLinkedinIn className="w-3 h-3" />,
};

const platformColors: Record<string, string> = {
  facebook: 'bg-[#E7F0FD] text-[#1877F2]',
  instagram: 'bg-[#FDE8EC] text-[#E4405F]',
  twitter: 'bg-[#F3F4F6] text-[#111827]',
  linkedin: 'bg-[#E8F0FE] text-[#0A66C2]',
};

const ConversationList = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activePlatform, setActivePlatform] = useState('all');
  const [error, setError] = useState('');

  const tabs = [
    { key: 'all', label: 'All' },
    { key: 'facebook', label: 'Facebook', icon: <FaFacebookF className="w-3.5 h-3.5" /> },
    { key: 'instagram', label: 'Instagram', icon: <FaFacebookF className="w-3.5 h-3.5" /> },
    { key: 'twitter', label: 'X', icon: <SiX className="w-3.5 h-3.5" /> },
    { key: 'linkedin', label: 'LinkedIn', icon: <FaLinkedinIn className="w-3.5 h-3.5" /> },
  ];

  const fetchConversations = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (activePlatform !== 'all') params.append('platform', activePlatform);
      if (search) params.append('search', sanitizeString(search));

      const { data } = await api.get(`${API_ENDPOINTS.CONVERSATIONS.BASE}?${params.toString()}`);
      setConversations(data.conversations || []);
    } catch (err: any) {
      setError('Failed to load conversations. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [activePlatform, search]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  const getLastMessage = (conv: Conversation) => {
    const msgs = conv.messages;
    if (msgs.length === 0) return 'No messages yet';
    const last = msgs[msgs.length - 1];
    return sanitizeString(last.content.slice(0, 80)) + (last.content.length > 80 ? '...' : '');
  };

  const getUnreadCount = (conv: Conversation) => {
    return conv.messages.filter((m) => m.direction === 'inbound').length;
  };

  return (
    <div>
      {/* Search */}
      <div className="mb-4">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search conversations..."
          className="w-full"
        />
      </div>

      {/* Platform Tabs */}
      <Tabs tabs={tabs} activeTab={activePlatform} onChange={setActivePlatform} className="mb-4" />

      {/* Error State */}
      {error && (
        <div className="p-4 bg-[#FEE2E2] border border-[#EF4444]/20 rounded-xl flex items-center gap-3 text-[#EF4444] text-sm mb-4 animate-scale-in">
          <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
          <button
            onClick={fetchConversations}
            className="ml-auto text-[#2563EB] hover:underline font-medium flex-shrink-0"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading State — Shimmer Skeletons */}
      {loading && (
        <div className="space-y-3 animate-fade-in">
          {[1, 2, 3, 4, 5].map((i) => (
            <SkeletonConversationRow key={i} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && conversations.length === 0 && (
        <EmptyState
          icon={<FiMessageSquare className="w-8 h-8" />}
          title="No conversations yet"
          description="Conversations will appear here when leads message you on connected social platforms."
        />
      )}

      {/* Conversation List */}
      {!loading && conversations.length > 0 && (
        <div className="space-y-2 animate-fade-in">
          {conversations.map((conv) => {
            const unread = getUnreadCount(conv);
            return (
              <Link
                key={conv._id}
                to={`/conversations/${conv._id}`}
                className="block bg-white rounded-xl border border-[#E5E7EB] p-4 hover:shadow-md hover:border-[#2563EB]/20 transition-all duration-200 group"
              >
                <div className="flex items-start gap-3">
                  {/* Platform Icon */}
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      platformColors[conv.platform] || 'bg-[#F3F4F6] text-[#6B7280]'
                    }`}
                  >
                    {platformIcons[conv.platform] || <FiMessageSquare className="w-4 h-4" />}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-sm font-semibold text-[#111827] truncate">
                          {sanitizeString(conv.leadId?.name || 'Unknown Lead')}
                        </span>
                        {unread > 0 && (
                          <span className="w-2 h-2 bg-[#2563EB] rounded-full flex-shrink-0 animate-pulse" />
                        )}
                      </div>
                      <span className="text-[10px] sm:text-xs text-[#9CA3AF] flex-shrink-0 ml-2">
                        {formatDate(conv.lastActivityAt, 'relative')}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#6B7280] truncate">
                      {getLastMessage(conv)}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <ConversationStatus status={conv.status} />

                      {conv.aiEscalated && (
                        <Badge variant="warning" size="sm">
                          Needs attention
                        </Badge>
                      )}

                      {conv.messages.some((m) => m.aiGenerated) && (
                        <span className="text-[10px] text-[#9CA3AF] flex items-center gap-1">
                          🤖 AI assisted
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Chevron indicator */}
                  <div className="flex-shrink-0 self-center text-[#D1D5DB] group-hover:text-[#2563EB] transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ConversationList;