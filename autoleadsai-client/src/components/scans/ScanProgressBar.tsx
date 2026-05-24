// src/components/scans/ScanProgressBar.tsx

import { FiLoader, FiCheckCircle, FiXCircle, FiClock } from 'react-icons/fi';

interface ScanProgressBarProps {
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  progress?: number;
  sources?: string[];
  sourceResults?: Record<string, { status: string; found: number }>;
  className?: string;
}

const statusConfig: Record<string, { icon: React.ReactNode; label: string; color: string; bg: string }> = {
  pending: {
    icon: <FiClock className="w-4 h-4" />,
    label: 'Pending',
    color: 'text-[#9CA3AF]',
    bg: 'bg-[#F3F4F6]',
  },
  running: {
    icon: <FiLoader className="w-4 h-4 animate-spin" />,
    label: 'Scanning...',
    color: 'text-[#2563EB]',
    bg: 'bg-[#EFF6FF]',
  },
  completed: {
    icon: <FiCheckCircle className="w-4 h-4" />,
    label: 'Completed',
    color: 'text-[#22C55E]',
    bg: 'bg-[#DCFCE7]',
  },
  failed: {
    icon: <FiXCircle className="w-4 h-4" />,
    label: 'Failed',
    color: 'text-[#EF4444]',
    bg: 'bg-[#FEE2E2]',
  },
  cancelled: {
    icon: <FiXCircle className="w-4 h-4" />,
    label: 'Cancelled',
    color: 'text-[#9CA3AF]',
    bg: 'bg-[#F3F4F6]',
  },
};

const ScanProgressBar = ({
  status,
  progress = 0,
  sources = [],
  sourceResults = {},
  className = '',
}: ScanProgressBarProps) => {
  const config = statusConfig[status] || statusConfig.pending;

  return (
    <div className={`bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-5 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${config.bg}`}>
            <span className={config.color}>{config.icon}</span>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#111827]">{config.label}</h4>
            {status === 'running' && (
              <p className="text-xs text-[#6B7280]">{Math.round(progress)}% complete</p>
            )}
          </div>
        </div>
        {status === 'running' && (
          <span className="text-xs font-medium text-[#2563EB] animate-pulse">
            {Math.round(progress)}%
          </span>
        )}
      </div>

      {/* Progress Bar */}
      {(status === 'running' || status === 'completed') && (
        <div className="w-full bg-[#F3F4F6] rounded-full h-2 overflow-hidden mb-4">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              status === 'completed'
                ? 'bg-[#22C55E]'
                : 'bg-linear-to-r from-[#2563EB] to-[#4F46E5]'
            }`}
            style={{ width: `${status === 'completed' ? 100 : Math.max(progress, 4)}%` }}
          />
        </div>
      )}

      {/* Source Status */}
      {sources.length > 0 && (
        <div className="space-y-2">
          {sources.map((source) => {
            const result = sourceResults[source];
            const isDone = result?.status === 'completed';
            const isRunning = result?.status === 'processing';
            const hasFailed = result?.status === 'failed';

            return (
              <div key={source} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  {isDone ? (
                    <FiCheckCircle className="w-3.5 h-3.5 text-[#22C55E]" />
                  ) : hasFailed ? (
                    <FiXCircle className="w-3.5 h-3.5 text-[#EF4444]" />
                  ) : isRunning ? (
                    <FiLoader className="w-3.5 h-3.5 text-[#2563EB] animate-spin" />
                  ) : (
                    <FiClock className="w-3.5 h-3.5 text-[#9CA3AF]" />
                  )}
                  <span className="text-[#374151] capitalize">{source.replace(/_/g, ' ')}</span>
                </div>
                <span className="text-[#9CA3AF]">
                  {isDone ? `${result?.found || 0} found` : hasFailed ? 'Failed' : isRunning ? 'Scanning' : 'Waiting'}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ScanProgressBar;