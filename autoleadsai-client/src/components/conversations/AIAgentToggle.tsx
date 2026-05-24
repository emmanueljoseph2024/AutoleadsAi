import { useState, useCallback } from 'react';
import { FiCpu, FiAlertCircle } from 'react-icons/fi';
import Tooltip from '../common/Tooltip';
import Spinner from '../common/Spinner';
import { sanitizeString } from '../../utils/sanitizers';

interface AIAgentToggleProps {
  enabled: boolean;
  platform: string;
  onToggle: (enabled: boolean) => Promise<void>;
  disabled?: boolean;
  className?: string;
}

const platformLabels: Record<string, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  twitter: 'X',
  linkedin: 'LinkedIn',
};

const AIAgentToggle = ({
  enabled,
  platform,
  onToggle,
  disabled = false,
  className = '',
}: AIAgentToggleProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [optimisticEnabled, setOptimisticEnabled] = useState(enabled);

  // Sync with prop when it changes externally
  const isEnabled = loading ? optimisticEnabled : enabled;

  const handleToggle = useCallback(async () => {
    if (loading || disabled) return;

    const newState = !isEnabled;
    setOptimisticEnabled(newState);
    setLoading(true);
    setError('');

    try {
      await onToggle(newState);
    } catch (err: any) {
      // Revert on failure
      setOptimisticEnabled(!newState);
      setError(err?.message || 'Failed to toggle AI agent. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [isEnabled, loading, disabled, onToggle]);

  const platformName = sanitizeString(platformLabels[platform] || platform);
  const tooltipContent = isEnabled
    ? `AI is auto-replying on ${platformName}. Click to disable.`
    : `AI auto-reply is off for ${platformName}. Click to enable.`;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Toggle Switch */}
      <Tooltip content={tooltipContent}>
        <button
          onClick={handleToggle}
          disabled={disabled || loading}
          role="switch"
          aria-checked={isEnabled}
          aria-label={`Toggle AI agent for ${platformName}`}
          className={`
            relative w-11 h-6 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2
            ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
            ${isEnabled
              ? 'bg-[#22C55E] hover:bg-[#16A34A]'
              : 'bg-[#D1D5DB] hover:bg-[#9CA3AF]'
            }
          `}
        >
          {/* Toggle Knob */}
          <div
            className={`
              absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-200
              ${isEnabled ? 'left-5' : 'left-0.5'}
            `}
          />

          {/* Loading indicator on knob */}
          {loading && (
            <div className="absolute top-0.5 left-0.5 w-5 h-5 flex items-center justify-center">
              <div className="w-3 h-3 border-2 border-[#9CA3AF] border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </button>
      </Tooltip>

      {/* Status Label */}
      <div className="flex items-center gap-1.5">
        {loading ? (
          <Spinner size="sm" />
        ) : (
          <FiCpu
            className={`w-4 h-4 transition-colors duration-200 ${
              isEnabled ? 'text-[#22C55E]' : 'text-[#9CA3AF]'
            }`}
          />
        )}
        <span
          className={`text-xs font-semibold transition-colors duration-200 ${
            isEnabled ? 'text-[#22C55E]' : 'text-[#9CA3AF]'
          }`}
        >
          AI {isEnabled ? 'Active' : 'Off'}
        </span>
      </div>

      {/* Platform Badge */}
      <span className="hidden sm:inline-block px-1.5 py-0.5 bg-[#F3F4F6] text-[#9CA3AF] rounded text-[10px] font-medium">
        {platformName}
      </span>

      {/* Error Indicator */}
      {error && (
        <Tooltip content={error}>
          <FiAlertCircle className="w-4 h-4 text-[#EF4444] cursor-help" />
        </Tooltip>
      )}
    </div>
  );
};

export default AIAgentToggle;