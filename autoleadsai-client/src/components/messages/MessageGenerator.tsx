// src/components/messages/MessageGenerator.tsx

import { useState } from 'react';
import { FiSend, FiCopy, FiCheck, FiRefreshCw, FiAlertCircle } from 'react-icons/fi';
import Button from '../common/Button';
import Dropdown from '../common/Dropdown';
import { sanitizeString } from '../../utils/sanitizers';
import { API_ENDPOINTS } from '../../utils/constants';
import api from '../../services/api';

interface MessageGeneratorProps {
  leadId?: string;
  leadName?: string;
  onMessageGenerated?: (message: string) => void;
}

const platformOptions = [
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'twitter', label: 'X (Twitter)' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'email', label: 'Email' },
];

const toneOptions = [
  { value: 'professional', label: 'Professional' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'casual', label: 'Casual' },
  { value: 'formal', label: 'Formal' },
  { value: 'direct', label: 'Direct' },
];

const typeOptions = [
  { value: 'initial_contact', label: 'Initial Contact' },
  { value: 'follow_up', label: 'Follow-up' },
  { value: 'value_pitch', label: 'Value Pitch' },
  { value: 'objection_response', label: 'Objection Response' },
  { value: 'closing', label: 'Closing' },
];

const MessageGenerator = ({ leadId, leadName, onMessageGenerated }: MessageGeneratorProps) => {
  const [platform, setPlatform] = useState('linkedin');
  const [tone, setTone] = useState('professional');
  const [messageType, setMessageType] = useState('initial_contact');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    try {
      const payload: Record<string, string> = {
        platform,
        tone,
        type: messageType,
      };
      if (leadId) payload.leadId = leadId;

      const { data } = await api.post(API_ENDPOINTS.MESSAGES.GENERATE, payload);
      const generatedBody = data.message?.body || '';
      setMessage(generatedBody);
      onMessageGenerated?.(generatedBody);
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Failed to generate message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = message;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Dropdown
          label="Platform"
          options={platformOptions}
          value={platform}
          onChange={setPlatform}
        />
        <Dropdown
          label="Tone"
          options={toneOptions}
          value={tone}
          onChange={setTone}
        />
        <Dropdown
          label="Message Type"
          options={typeOptions}
          value={messageType}
          onChange={setMessageType}
        />
      </div>

      {/* Generate Button */}
      <Button
        onClick={handleGenerate}
        loading={loading}
        icon={<FiSend className="w-4 h-4" />}
        className="w-full"
      >
        {loading
          ? 'Generating...'
          : leadName
          ? `Generate Message for ${sanitizeString(leadName)}`
          : 'Generate Message'}
      </Button>

      {/* Error */}
      {error && (
        <div className="p-3 bg-[#FEE2E2] border border-[#EF4444]/20 rounded-xl flex items-center gap-2 text-[#EF4444] text-xs animate-scale-in">
          <FiAlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
          <button
            onClick={handleGenerate}
            className="ml-auto text-[#2563EB] hover:underline font-medium shrink-0"
          >
            Retry
          </button>
        </div>
      )}

      {/* Generated Message */}
      {message && (
        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4 animate-slide-up">
          <p className="text-sm text-[#374151] whitespace-pre-wrap leading-relaxed">
            {message}
          </p>
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#E5E7EB]">
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopy}
              icon={
                copied ? (
                  <FiCheck className="w-3.5 h-3.5 text-[#22C55E]" />
                ) : (
                  <FiCopy className="w-3.5 h-3.5" />
                )
              }
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleGenerate}
              loading={loading}
              icon={<FiRefreshCw className="w-3.5 h-3.5" />}
            >
              Regenerate
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageGenerator;