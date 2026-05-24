// src/components/leads/LeadMessageGenerator.tsx

import { useState } from 'react';
import { FiSend, FiCopy, FiCheck, FiRefreshCw } from 'react-icons/fi';
import Button from '../common/Button';
import Dropdown from '../common/Dropdown';
import { API_ENDPOINTS } from '../../utils/constants';
import { sanitizeString } from '../../utils/sanitizers';
import api from '../../services/api';

interface LeadMessageGeneratorProps {
  leadId: string;
  leadName: string;
  platforms: string[];
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
  { value: 'direct', label: 'Direct' },
];

const typeOptions = [
  { value: 'initial_contact', label: 'Initial Contact' },
  { value: 'follow_up', label: 'Follow-up' },
  { value: 'value_pitch', label: 'Value Pitch' },
  { value: 'objection_response', label: 'Objection Response' },
];

const LeadMessageGenerator = ({ leadId, leadName }: LeadMessageGeneratorProps) => {
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
      const { data } = await api.post(API_ENDPOINTS.MESSAGES.GENERATE, {
        leadId,
        platform,
        tone,
        type: messageType,
      });
      setMessage(data.message?.body || '');
    } catch (err: any) {
      setError('Failed to generate message. Please try again.');
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
      // Fallback
    }
  };

  return (
    <div className="space-y-4">
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
          label="Type"
          options={typeOptions}
          value={messageType}
          onChange={setMessageType}
        />
      </div>

      <Button
        onClick={handleGenerate}
        loading={loading}
        icon={<FiSend className="w-4 h-4" />}
        className="w-full"
      >
        {loading ? 'Generating...' : `Generate Message for ${sanitizeString(leadName)}`}
      </Button>

      {error && (
        <p className="text-xs text-[#EF4444] flex items-center gap-1">
          {error}
          <button onClick={handleGenerate} className="text-[#2563EB] hover:underline ml-1">
            Retry
          </button>
        </p>
      )}

      {message && (
        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4 relative animate-slide-up">
          <p className="text-sm text-[#374151] whitespace-pre-wrap leading-relaxed">
            {message}
          </p>
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#E5E7EB]">
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopy}
              icon={copied ? <FiCheck className="w-3.5 h-3.5 text-[#22C55E]" /> : <FiCopy className="w-3.5 h-3.5" />}
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

export default LeadMessageGenerator;