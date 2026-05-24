// src/components/settings/NotificationSettings.tsx

import { useState } from 'react';
import { FiBell, FiMail, FiAlertCircle } from 'react-icons/fi';
import Button from '../common/Button';
import Skeleton from '../common/Skeleton';
import { API_ENDPOINTS } from '../../utils/constants';
import api from '../../services/api';

interface NotificationSettingsProps {
  preferences: {
    weeklyReport: boolean;
    trialEnding: boolean;
    paymentFailed: boolean;
    hotLeadAlert: boolean;
    scanCompleted: boolean;
  } | null;
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
  onUpdated?: () => void;
}

const notificationOptions = [
  { key: 'weeklyReport', label: 'Weekly Report', description: 'Summary of leads and performance every Monday' },
  { key: 'trialEnding', label: 'Trial Ending', description: 'Reminder when your trial is about to expire' },
  { key: 'paymentFailed', label: 'Payment Failed', description: 'Alert when a payment fails' },
  { key: 'hotLeadAlert', label: 'Hot Lead Alert', description: 'Instant notification when a hot lead is detected' },
  { key: 'scanCompleted', label: 'Scan Completed', description: 'Notification when a scan finishes' },
];

const NotificationSettings = ({
  preferences,
  loading = false,
  error = '',
  onRetry,
  onUpdated,
}: NotificationSettingsProps) => {
  const [toggling, setToggling] = useState<string | null>(null);

  const handleToggle = async (key: string, currentValue: boolean) => {
    if (!preferences) return;
    setToggling(key);
    try {
      await api.put('/users/me/notifications', {
        ...preferences,
        [key]: !currentValue,
      });
      onUpdated?.();
    } catch (err: any) {
      // Error handled silently
    } finally {
      setToggling(null);
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
      <div className="space-y-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {notificationOptions.map((option) => {
        const isEnabled = preferences?.[option.key as keyof typeof preferences] ?? true;
        const isToggling = toggling === option.key;

        return (
          <div
            key={option.key}
            className="flex items-center justify-between bg-white border border-[#E5E7EB] rounded-xl p-3"
          >
            <div>
              <p className="text-sm font-medium text-[#111827]">{option.label}</p>
              <p className="text-xs text-[#6B7280]">{option.description}</p>
            </div>
            <button
              onClick={() => handleToggle(option.key, isEnabled)}
              disabled={!!toggling}
              className={`
                relative w-10 h-5 rounded-full transition-colors duration-200 shrink-0
                ${isEnabled ? 'bg-[#22C55E]' : 'bg-[#D1D5DB]'}
              `}
            >
              <div
                className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                  isEnabled ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
              {isToggling && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationSettings;