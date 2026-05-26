// src/pages/dashboard/TeamPage.tsx

import { useState, useEffect, useCallback } from 'react';
import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi';
import TeamSettings from '../../components/settings/TeamSettings';
import Toast from '../../components/common/Toast';
import api from '../../services/api';

const TeamPage = () => {
  const [members, setMembers] = useState<any[]>([]);
  const [invites, setInvites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fetchTeam = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get('/team');
      setMembers(data.members || []);
      setInvites(data.invites || []);
    } catch (err: any) {
      setError('Failed to load team.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTeam(); }, [fetchTeam]);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div><h1 className="text-xl sm:text-2xl font-bold text-[#111827]">Team</h1></div>

      {error && (
        <div className="p-4 bg-[#FEE2E2] border border-[#EF4444]/20 rounded-xl flex items-center gap-3 text-[#EF4444] text-sm">
          <FiAlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
          <button onClick={fetchTeam} className="ml-auto flex items-center gap-1.5 text-[#2563EB] hover:underline font-medium">
            <FiRefreshCw className="w-4 h-4" /> Retry
          </button>
        </div>
      )}

      <TeamSettings
        members={members}
        invites={invites}
        maxMembers={3}
        loading={loading}
        error={error}
        onRetry={fetchTeam}
        onMemberUpdated={fetchTeam}
      />

      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-slide-down">
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        </div>
      )}
    </div>
  );
};

export default TeamPage;