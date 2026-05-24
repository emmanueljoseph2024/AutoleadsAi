// src/components/settings/CrmSettings.tsx

import { useState } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import Button from '../common/Button';
import Dropdown from '../common/Dropdown';
import Badge from '../common/Badge';
import Skeleton from '../common/Skeleton';
import { formatDate } from '../../utils/formatDate';
import api from '../../services/api';

interface CrmSettingsProps {
  integration: {
    provider: string;
    isActive: boolean;
    syncDirection: string;
    lastSyncedAt?: string;
  } | null;
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
  onUpdated?: () => void;
}

const providerOptions = [
  { value: 'hubspot', label: 'HubSpot' },
  { value: 'salesforce', label: 'Salesforce' },
  { value: 'zoho', label: 'Zoho CRM' },
  { value: 'pipedrive', label: 'Pipedrive' },
];

const directionOptions = [
  { value: 'export', label: 'Export Only — Send leads to CRM' },
  { value: 'import', label: 'Import Only — Pull leads from CRM' },
  { value: 'bidirectional', label: 'Bidirectional — Sync both ways' },
];

const CrmSettings = ({
  integration,
  loading = false,
  error = '',
  onRetry,
  onUpdated,
}: CrmSettingsProps) => {
  const [connecting, setConnecting] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(integration?.provider || 'hubspot');

  const handleConnect = async () => {
    setConnecting(true);
    try {
      const { data } = await api.get(`/integrations/crm/${selectedProvider}/connect`);
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
      await api.delete('/integrations/crm');
      onUpdated?.();
    } catch (err: any) {
      // Error handled silently
    } finally {
      setConnecting(false);
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
      </div>
    );
  }

  if (!integration?.isActive) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-[#6B7280]">
          Connect your CRM to automatically sync leads. AutoLeads AI supports HubSpot, Salesforce, Zoho, and Pipedrive.
        </p>
        <Dropdown
          label="Select CRM Provider"
          options={providerOptions}
          value={selectedProvider}
          onChange={setSelectedProvider}
        />
        <Button onClick={handleConnect} loading={connecting} className="w-full">
          Connect {providerOptions.find((p) => p.value === selectedProvider)?.label}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-[#F9FAFB] rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-[#111827] capitalize">{integration.provider}</p>
          <p className="text-xs text-[#6B7280]">
            Sync: {integration.syncDirection}
            {integration.lastSyncedAt && (
              <span className="ml-2">Last synced {formatDate(integration.lastSyncedAt, 'relative')}</span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success" size="sm">Connected</Badge>
          <Button variant="ghost" size="sm" onClick={handleDisconnect} loading={connecting}>
            Disconnect
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CrmSettings;