// src/components/messages/MessagePreview.tsx

import { FiX, FiCopy, FiCheck, FiRefreshCw } from 'react-icons/fi';
import Button from '../common/Button';
import Badge from '../common/Badge';
import CopyButton from '../common/CopyButton';
import { sanitizeString } from '../../utils/sanitizers';

interface MessagePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  platform: string;
  tone: string;
  type: string;
  leadName?: string;
  onRegenerate?: () => void;
  loading?: boolean;
}

const platformLabels: Record<string, string> = {
  linkedin: 'LinkedIn',
  facebook: 'Facebook',
  twitter: 'X',
  instagram: 'Instagram',
  email: 'Email',
};

const MessagePreview = ({
  isOpen,
  onClose,
  message,
  platform,
  tone,
  type,
  leadName,
  onRegenerate,
  loading = false,
}: MessagePreviewProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl border border-[#E5E7EB] w-full max-w-lg p-6 sm:p-8 animate-scale-in">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#9CA3AF] hover:text-[#111827] transition-colors"
          aria-label="Close preview"
        >
          <FiX className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-[#111827] mb-2">Message Preview</h3>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="neutral" size="sm">
              {platformLabels[platform] || platform}
            </Badge>
            <Badge variant="info" size="sm">
              {tone}
            </Badge>
            <Badge variant="neutral" size="sm">
              {type.replace(/_/g, ' ')}
            </Badge>
            {leadName && (
              <span className="text-xs text-[#9CA3AF]">
                For: {sanitizeString(leadName)}
              </span>
            )}
          </div>
        </div>

        {/* Message Content */}
        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4 mb-4 max-h-[400px] overflow-y-auto">
          <p className="text-sm text-[#374151] whitespace-pre-wrap leading-relaxed">
            {message}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <CopyButton text={message} />
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopy}
            icon={<FiCopy className="w-3.5 h-3.5" />}
          >
            Copy to Clipboard
          </Button>
          {onRegenerate && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onRegenerate}
              loading={loading}
              icon={<FiRefreshCw className="w-3.5 h-3.5" />}
              className="ml-auto"
            >
              Regenerate
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

// Standalone copy handler
const handleCopy = async () => {
  const messageEl = document.querySelector('.message-content');
  if (messageEl?.textContent) {
    await navigator.clipboard.writeText(messageEl.textContent);
  }
};

export default MessagePreview;