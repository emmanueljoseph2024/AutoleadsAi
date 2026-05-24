// src/components/settings/AiAgentSettings.tsx

import { useState } from 'react';
import { FiCpu, FiClock, FiAlertCircle } from 'react-icons/fi';
import Button from '../common/Button';
import Input from '../common/Input';
import AIAgentToggle from '../conversations/AIAgentToggle';
import Skeleton from '../common/Skeleton';
import { sanitizeString } from '../../utils/sanitizers';
import { API_ENDPOINTS } from '../../utils/constants';
import api from '../../services/api';

interface AiAgentSettingsProps {
  config: {
    platforms: Record<string, { isEnabled: boolean; autoReplyEnabled: boolean }>;
    personality: string;
    escalationKeywords: string[];
    disclaimerMessage: string;
  } | null;
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
  onUpdated?: () => void;
}

const personalityOptions = ['professional', 'friendly', 'casual', 'direct'];

const AiAgentSettings = ({
  config,
  loading = false,
  error = '',
  onRetry,
  onUpdated,
}: AiAgentSettingsProps) => {
  const [saving, setSaving] = useState(false);
  const [newKeyword, setNewKeyword] = useState('');
  const [keywords, setKeywords] = useState<string[]>(config?.escalationKeywords || []);
  const [personality, setPersonality] = useState(config?.personality || 'professional');
  const [disclaimer, setDisclaimer] = useState(config?.disclaimerMessage || '');

  const handleTogglePlatform = async (platform: string, enabled: boolean) => {
    try {
      await api.put('/integrations/ai-agent', {
        platform,
        isEnabled: enabled,
      });
      onUpdated?.();
    } catch (err: any) {
      // Error handled silently
    }
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      await api.put('/integrations/ai-agent', {
        personality,
        escalationKeywords: keywords,
        disclaimerMessage: disclaimer,
      });
      onUpdated?.();
    } catch (err: any) {
      // Error handled silently
    } finally {
      setSaving(false);
    }
  };

  const handleAddKeyword = () => {
    const trimmed = newKeyword.trim().toLowerCase();
    if (trimmed && !keywords.includes(trimmed)) {
      setKeywords([...keywords, trimmed]);
      setNewKeyword('');
    }
  };

  if (error) {
    return (
      <div className="p-4 bg-[#FEE2E2] border border-[#EF4444]/20 rounded-xl flex items-center gap-3 text-[#EF4444] text-sm">
        <FiAlertCircle className="w-5 h-5 shrink-0" />
        <span>{error}</span>
        {onRetry && (
          <button onClick={onRetry} className="ml-auto text-[#2563EB] hover:underline font-medium shrink-0">
            Retry
          </button>
        )}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Platform Toggles */}
      <div>
        <h4 className="text-sm font-semibold text-[#111827] mb-3">Enabled Platforms</h4>
        <div className="space-y-2">
          {['facebook', 'instagram', 'twitter'].map((platform) => (
            <div
              key={platform}
              className="flex items-center justify-between bg-white border border-[#E5E7EB] rounded-xl p-3"
            >
              <span className="text-sm text-[#374151] capitalize">{platform}</span>
              <AIAgentToggle
                enabled={config?.platforms[platform]?.isEnabled || false}
                platform={platform}
                onToggle={(enabled) => handleTogglePlatform(platform, enabled)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Personality */}
      <div>
        <h4 className="text-sm font-semibold text-[#111827] mb-3">AI Personality</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {personalityOptions.map((p) => (
            <button
              key={p}
              onClick={() => setPersonality(p)}
              className={`px-3 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                personality === p
                  ? 'bg-[#EFF6FF] text-[#2563EB] border border-[#2563EB]/30'
                  : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:border-[#D1D5DB]'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Escalation Keywords */}
      <div>
        <h4 className="text-sm font-semibold text-[#111827] mb-3">Escalation Keywords</h4>
        <p className="text-xs text-[#6B7280] mb-2">
          When a lead uses these words, the AI will escalate to a human.
        </p>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddKeyword())}
            placeholder="Add keyword..."
            className="flex-1 px-3 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            maxLength={50}
          />
          <Button variant="outline" size="sm" onClick={handleAddKeyword} disabled={!newKeyword.trim()}>
            Add
          </Button>
        </div>
        {keywords.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {keywords.map((kw) => (
              <span
                key={kw}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#F3F4F6] text-[#6B7280] rounded-full text-xs"
              >
                {sanitizeString(kw)}
                <button
                  onClick={() => setKeywords(keywords.filter((k) => k !== kw))}
                  className="text-[#9CA3AF] hover:text-[#EF4444]"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Disclaimer Message */}
      <div>
        <h4 className="text-sm font-semibold text-[#111827] mb-2">AI Disclaimer Message</h4>
        <textarea
          value={disclaimer}
          onChange={(e) => setDisclaimer(e.target.value)}
          placeholder="🤖 I'm an AI assistant. A human will step in if needed."
          rows={2}
          maxLength={200}
          className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        />
      </div>

      <Button onClick={handleSaveSettings} loading={saving} className="w-full">
        Save AI Settings
      </Button>
    </div>
  );
};

export default AiAgentSettings;