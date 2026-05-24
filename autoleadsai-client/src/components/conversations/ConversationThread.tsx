import { useState, useEffect, useRef, useCallback } from 'react';
import { FiSend, FiUser, FiAlertTriangle, FiArrowLeft, FiMoreVertical } from 'react-icons/fi';
import { FaLinkedinIn, FaFacebookF, FaRedditAlien } from 'react-icons/fa';
import { SiX } from 'react-icons/si';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import Spinner from '../common/Spinner';
import Badge from '../common/Badge';
import Avatar from '../common/Avatar';
import ConversationBubble from './ConversationBubble';
import AIAgentToggle from './AIAgentToggle';
import { sanitizeString } from '../../utils/sanitizers';
import { API_ENDPOINTS } from '../../utils/constants';
import { formatDate } from '../../utils/formatDate';
import api from '../../services/api';

interface Message {
  _id?: string;
  direction: 'inbound' | 'outbound';
  content: string;
  senderName?: string;
  aiGenerated: boolean;
  confidence?: number;
  sentAt?: string;
  createdAt: string;
}

interface Conversation {
  _id: string;
  leadId?: { _id: string; name: string; email: string };
  platform: 'facebook' | 'instagram' | 'twitter' | 'linkedin';
  platformConversationId: string;
  status: 'active' | 'waiting' | 'human_needed' | 'closed' | 'spam';
  messages: Message[];
  aiEscalated: boolean;
  aiEscalationReason?: string;
  sentiment: string;
  intent: string;
  lastActivityAt: string;
}

const platformLabels: Record<string, string> = {
  facebook: 'Facebook Messenger',
  instagram: 'Instagram DM',
  twitter: 'X Direct Message',
  linkedin: 'LinkedIn Message',
};

const ConversationThread = ({ conversationId }: { conversationId: string }) => {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(true);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchConversation = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get(API_ENDPOINTS.CONVERSATIONS.BY_ID(conversationId));
      setConversation(data.conversation);
    } catch (err: any) {
      setError('Failed to load conversation.');
    } finally {
      setLoading(false);
    }
  }, [conversationId]);

  useEffect(() => {
    fetchConversation();
  }, [fetchConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation?.messages]);

  const handleSend = async () => {
    const trimmed = sanitizeString(message).trim();
    if (!trimmed || !conversation) return;

    setSending(true);
    try {
      await api.post(API_ENDPOINTS.CONVERSATIONS.REPLY(conversation._id), {
        content: trimmed,
        aiGenerated: false,
      });
      setMessage('');
      await fetchConversation();
    } catch (err: any) {
      setError('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleToggleAI = async (enabled: boolean) => {
    setAiEnabled(enabled);
    try {
      await api.put(API_ENDPOINTS.SETTINGS.AI_AGENT, {
        platform: conversation?.platform,
        autoReplyEnabled: enabled,
      });
    } catch {
      setAiEnabled(!enabled);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-sm text-[#6B7280]">Loading conversation...</p>
        </div>
      </div>
    );
  }

  if (!conversation) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-[#EF4444]">{error || 'Conversation not found'}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-[#E5E7EB] bg-[#F9FAFB]">
        <div className="flex items-center gap-3">
          <button onClick={() => window.history.back()} className="sm:hidden text-[#6B7280] hover:text-[#111827]">
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <Avatar
            name={conversation.leadId?.name || 'Unknown'}
            size="md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-[#111827]">
                {conversation.leadId?.name || 'Unknown Lead'}
              </h3>
              {conversation.sentiment === 'positive' && <Badge variant="success" size="sm">Positive</Badge>}
              {conversation.sentiment === 'negative' && <Badge variant="danger" size="sm">Negative</Badge>}
            </div>
            <p className="text-xs text-[#9CA3AF]">{platformLabels[conversation.platform]}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <AIAgentToggle
            enabled={aiEnabled}
            platform={conversation.platform}
            onToggle={handleToggleAI}
          />
          {conversation.leadId && (
            <Link
              to={`/leads/${conversation.leadId._id}`}
              className="text-xs text-[#2563EB] hover:underline hidden sm:block"
            >
              View Lead Profile
            </Link>
          )}
        </div>
      </div>

      {/* Escalation Banner */}
      {conversation.aiEscalated && (
        <div className="px-4 sm:px-6 py-2 bg-[#FEF3C7] border-b border-[#F59E0B]/20 flex items-center gap-2">
          <FiAlertTriangle className="w-4 h-4 text-[#F59E0B] flex-shrink-0" />
          <p className="text-xs sm:text-sm text-[#92400E]">
            AI couldn't handle this — {conversation.aiEscalationReason || 'waiting for your reply'}
          </p>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-3 bg-[#F9FAFB]">
        {conversation.messages.map((msg, index) => (
          <ConversationBubble
            key={msg._id || index}
            message={msg}
            platform={conversation.platform}
          />
        ))}

        {/* AI Typing Indicator */}
        {aiEnabled && conversation.status === 'active' && (
          <div className="flex items-center gap-2 pl-2 animate-fade-in">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-[#9CA3AF] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-[#9CA3AF] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-[#9CA3AF] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-xs text-[#9CA3AF]">AI is monitoring...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 sm:px-6 py-3 border-t border-[#E5E7EB] bg-white">
        <div className="flex items-end gap-2">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, 2000))}
            onKeyDown={handleKeyDown}
            placeholder={
              conversation.status === 'closed'
                ? 'Conversation is closed'
                : 'Type your message...'
            }
            rows={2}
            maxLength={2000}
            disabled={conversation.status === 'closed'}
            className="flex-1 px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent resize-none disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <Button
            onClick={handleSend}
            disabled={!message.trim() || sending || conversation.status === 'closed'}
            loading={sending}
            icon={!sending ? <FiSend className="w-4 h-4" /> : undefined}
            className="flex-shrink-0"
          >
            {sending ? '' : 'Send'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConversationThread;