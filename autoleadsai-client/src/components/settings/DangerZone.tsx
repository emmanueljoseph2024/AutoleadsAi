// src/components/settings/DangerZone.tsx

import { useState } from 'react';
import { FiAlertTriangle, FiTrash2, FiLogOut } from 'react-icons/fi';
import Button from '../common/Button';
import ConfirmDialog from '../common/ConfirmDialog';
import { useAuth } from '../../contexts/AuthContext';

const DangerZone = () => {
  const { logout } = useAuth();
  const [showDeactivate, setShowDeactivate] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeactivate = async () => {
    setLoading(true);
    try {
      const { default: api } = await import('../../services/api');
      await api.delete('/users/me');
      await logout();
    } catch (err: any) {
      // Error handled silently
    } finally {
      setLoading(false);
      setShowDeactivate(false);
    }
  };

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-semibold text-[#EF4444] flex items-center gap-2">
        <FiAlertTriangle className="w-4 h-4" />
        Danger Zone
      </h4>

      <div className="border border-[#EF4444]/20 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[#111827]">Deactivate Account</p>
            <p className="text-xs text-[#6B7280] mt-0.5">
              Permanently deactivate your account and all data. This cannot be undone.
            </p>
          </div>
          <Button
            variant="danger"
            size="sm"
            onClick={() => setShowDeactivate(true)}
            icon={<FiTrash2 className="w-4 h-4" />}
            className="shrink-0"
          >
            Deactivate
          </Button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showDeactivate}
        onClose={() => setShowDeactivate(false)}
        onConfirm={handleDeactivate}
        title="Deactivate Account"
        message="Are you absolutely sure? This will permanently delete your account, all leads, scans, workflows, and settings. This action cannot be undone."
        confirmLabel="Deactivate Forever"
        variant="danger"
        loading={loading}
      />
    </div>
  );
};

export default DangerZone;