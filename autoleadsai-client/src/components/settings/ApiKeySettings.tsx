// src/components/settings/ApiKeySettings.tsx

import { useState } from 'react';
import { FiKey, FiCopy, FiTrash2, FiEye, FiEyeOff, FiPlus, FiAlertCircle } from 'react-icons/fi';
import Button from '../common/Button';
import Input from '../common/Input';
import Badge from '../common/Badge';
import ConfirmDialog from '../common/ConfirmDialog';
import EmptyState from '../common/EmptyState';
import { SkeletonList } from '../common/Skeleton';
import { formatDate } from '../../utils/formatDate';
import { API_ENDPOINTS } from '../../utils/constants';
import api from '../../services/api';

interface ApiKey {
  _id: string;
  name: string;
  prefix: string;
  lastUsedAt?: string;
  expiresAt?: string;
  createdAt: string;
}

interface ApiKeySettingsProps {
  apiKeys: ApiKey[];
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
  onKeysUpdated?: () => void;
}

const ApiKeySettings = ({
  apiKeys,
  loading = false,
  error = '',
  onRetry,
  onKeysUpdated,
}: ApiKeySettingsProps) => {
  const [keyName, setKeyName] = useState('');
  const [generating, setGenerating] = useState(false);
  const [newKey, setNewKey] = useState<string | null>(null);
  const [showNewKey, setShowNewKey] = useState(false);
  const [deleteKey, setDeleteKey] = useState<ApiKey | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [genError, setGenError] = useState('');

  const handleGenerateKey = async () => {
    if (!keyName.trim()) {
      setGenError('Key name is required');
      return;
    }

    setGenerating(true);
    setGenError('');
    try {
      const { data } = await api.post('/api-keys', { name: keyName.trim() });
      setNewKey(data.key);
      setKeyName('');
      onKeysUpdated?.();
    } catch (err: any) {
      setGenError(err?.response?.data?.error || 'Failed to generate key.');
    } finally {
      setGenerating(false);
    }
  };

  const handleDeleteKey = async () => {
    if (!deleteKey) return;
    setDeleteLoading(true);
    try {
      await api.delete(`/api-keys/${deleteKey._id}`);
      setDeleteKey(null);
      onKeysUpdated?.();
    } catch (err: any) {
      // Error handled silently
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleCopyKey = async () => {
    if (newKey) {
      await navigator.clipboard.writeText(newKey);
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

  return (
    <div className="space-y-6">
      {/* Generate New Key */}
      <div className="bg-[#F9FAFB] rounded-xl p-4">
        <h4 className="text-sm font-semibold text-[#111827] mb-3">Generate New API Key</h4>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            type="text"
            value={keyName}
            onChange={(e) => {
              setKeyName(e.target.value);
              if (genError) setGenError('');
            }}
            placeholder="Key name (e.g., Production)"
            error={genError}
            className="flex-1"
            maxLength={100}
          />
          <Button
            onClick={handleGenerateKey}
            loading={generating}
            disabled={!keyName.trim()}
            icon={<FiPlus className="w-4 h-4" />}
            className="shrink-0"
          >
            Generate
          </Button>
        </div>

        {/* New Key Display */}
        {newKey && (
          <div className="mt-4 p-4 bg-[#DCFCE7] border border-[#22C55E]/20 rounded-xl animate-scale-in">
            <p className="text-xs font-medium text-[#22C55E] mb-2">
              Key generated! Copy it now — you won't be able to see it again.
            </p>
            <div className="flex items-center gap-2">
              <code className="flex-1 px-3 py-2 bg-white rounded-lg text-xs text-[#111827] font-mono break-all">
                {showNewKey ? newKey : '••••••••••••••••••••••••••••'}
              </code>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNewKey(!showNewKey)}
                icon={showNewKey ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
              >
                {''}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyKey}
                icon={<FiCopy className="w-4 h-4" />}
              >
                {''}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Keys List */}
      {loading ? (
        <SkeletonList rows={3} />
      ) : apiKeys.length === 0 ? (
        <EmptyState
          icon={<FiKey className="w-8 h-8" />}
          title="No API keys"
          description="Generate an API key to access the AutoLeads AI API."
        />
      ) : (
        <div className="space-y-2">
          {apiKeys.map((key) => (
            <div
              key={key._id}
              className="flex items-center justify-between bg-white border border-[#E5E7EB] rounded-xl p-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 bg-[#F3F4F6] rounded-lg flex items-center justify-center shrink-0">
                  <FiKey className="w-4 h-4 text-[#6B7280]" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#111827]">{key.name}</p>
                  <p className="text-xs text-[#9CA3AF] font-mono">
                    {key.prefix}...
                    {key.lastUsedAt && (
                      <span className="ml-2">
                        Last used {formatDate(key.lastUsedAt, 'relative')}
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant="neutral" size="sm">
                  Created {formatDate(key.createdAt, 'short')}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDeleteKey(key)}
                  icon={<FiTrash2 className="w-4 h-4 text-[#EF4444]" />}
                >
                  {''}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteKey}
        onClose={() => setDeleteKey(null)}
        onConfirm={handleDeleteKey}
        title="Revoke API Key"
        message={`Are you sure you want to revoke "${deleteKey?.name}"? This action cannot be undone and any services using this key will stop working.`}
        confirmLabel="Revoke Key"
        variant="danger"
        loading={deleteLoading}
      />
    </div>
  );
};

export default ApiKeySettings;