// src/components/settings/SlackSettings.tsx

import { useState } from 'react';
import { FiCheck, FiAlertCircle } from 'react-icons/fi';
import { FaSlack } from 'react-icons/fa';
import Button from '../common/Button';
import Badge from '../common/Badge';
import Skeleton  from '../common/Skeleton';
import api from '../../services/api';

interface SlackSettingsProps {
  integration: {
    isConnected: boolean;
    workspaceName?: string;
    channelName?: string;
    events: string[];
  } | null;
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
  onUpdated?: () => void;
}

const eventOptions = [
  { value: 'hot_lead', label: 'Hot Lead Detected' },
  { value: 'new_lead', label: 'New Lead Discovered' },
  { value: 'scan_completed', label: 'Scan Completed' },
  { value: 'email_opened', label: 'Email Opened' },
  { value: 'email_replied', label: 'Lead Replied' },
];

const SlackSettings = ({
  integration,
  loading = false,
  error = '',
  onRetry,
  onUpdated,
}: SlackSettingsProps) => {
  const [connecting, setConnecting] = useState(false);
  const [toggling, setToggling] = useState<string | null>(null);

  const handleConnect = async () => {
    setConnecting(true);
    try {
      const { data } = await api.get('/integrations/slack/connect');
      // Redirect to Slack OAuth
      window.location.href = data.authUrl;
    } catch (err: any) {
      // Error handled silently
    } finally {
      setConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    setConnecting(true);
    try {
      await api.delete('/integrations/slack');
      onUpdated?.();
    } catch (err: any) {
      // Error handled silently
    } finally {
      setConnecting(false);
    }
  };

  const handleToggleEvent = async (event: string) => {
    if (!integration) return;
    setToggling(event);
    try {
      const newEvents = integration.events.includes(event)
        ? integration.events.filter((e) => e !== event)
        : [...integration.events, event];

      await api.put('/integrations/slack', { events: newEvents });
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
      <div className="space-y-3">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (!integration?.isConnected) {
    return (
      <div className="text-center py-8">
        <div className="w-14 h-14 bg-[#F3F4F6] rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FaSlack className="w-7 h-7 text-[#9CA3AF]" />
        </div>
        <h4 className="text-lg font-bold text-[#111827] mb-2">Connect Slack</h4>
        <p className="text-sm text-[#6B7280] mb-6 max-w-md mx-auto">
          Get real-time notifications in Slack when hot leads are found, emails are opened, and more.
        </p>
        <Button onClick={handleConnect} loading={connecting}>
          Connect Slack
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Connected Info */}
      <div className="bg-[#F9FAFB] rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#4A154B] rounded-xl flex items-center justify-center">
            <FaSlack className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#111827]">
              Connected to {integration.workspaceName || 'Slack'}
            </p>
            {integration.channelName && (
              <p className="text-xs text-[#6B7280]">
                Channel: #{integration.channelName}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success" size="sm">Connected</Badge>
          <Button variant="ghost" size="sm" onClick={handleDisconnect} loading={connecting}>
            Disconnect
          </Button>
        </div>
      </div>

      {/* Event Toggles */}
      <div>
        <h4 className="text-sm font-semibold text-[#111827] mb-3">Notification Events</h4>
        <div className="space-y-2">
          {eventOptions.map((event) => {
            const isEnabled = integration.events.includes(event.value);
            const isToggling = toggling === event.value;

            return (
              <button
                key={event.value}
                onClick={() => handleToggleEvent(event.value)}
                disabled={!!toggling}
                className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                  isEnabled
                    ? 'bg-[#EFF6FF] border-[#2563EB]/30'
                    : 'bg-white border-[#E5E7EB] hover:border-[#D1D5DB]'
                }`}
              >
                <span className="text-sm text-[#374151]">{event.label}</span>
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  isEnabled ? 'border-[#2563EB] bg-[#2563EB]' : 'border-[#D1D5DB]'
                }`}>
                  {isEnabled && <FiCheck className="w-3 h-3 text-white" />}
                </div>
                {isToggling && (
                  <div className="w-4 h-4 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin ml-2" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SlackSettings;