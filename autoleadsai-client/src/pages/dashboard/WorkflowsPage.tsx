// src/pages/dashboard/WorkflowsPage.tsx

import { useState, useEffect, useCallback } from 'react';
import { FiPlus, FiAlertCircle, FiRefreshCw } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import WorkflowList from '../../components/workflows/WorkflowList';
import Button from '../../components/common/Button';
import Toast from '../../components/common/Toast';
import { API_ENDPOINTS } from '../../utils/constants';
import api from '../../services/api';

const WorkflowsPage = () => {
  const navigate = useNavigate();
  const [workflows, setWorkflows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fetchWorkflows = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get(API_ENDPOINTS.WORKFLOWS.BASE);
      setWorkflows(data.workflows || []);
    } catch (err: any) {
      setError('Failed to load workflows.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchWorkflows(); }, [fetchWorkflows]);

  const handleToggle = async (workflow: any) => {
    await api.patch(API_ENDPOINTS.WORKFLOWS.TOGGLE(workflow._id));
    fetchWorkflows();
  };

  const handleDelete = async (workflow: any) => {
    await api.delete(API_ENDPOINTS.WORKFLOWS.BY_ID(workflow._id));
    fetchWorkflows();
    setToast({ message: 'Workflow deleted!', type: 'success' });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#111827]">Workflows</h1>
          <p className="text-sm text-[#6B7280]">{workflows.length} workflows</p>
        </div>
        <Button size="sm" icon={<FiPlus className="w-4 h-4" />} onClick={() => navigate('/workflows/new/build')}>Create Workflow</Button>
      </div>

      {error && (
        <div className="p-4 bg-[#FEE2E2] border border-[#EF4444]/20 rounded-xl flex items-center gap-3 text-[#EF4444] text-sm">
          <FiAlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
          <button onClick={fetchWorkflows} className="ml-auto flex items-center gap-1.5 text-[#2563EB] hover:underline font-medium">
            <FiRefreshCw className="w-4 h-4" /> Retry
          </button>
        </div>
      )}

      <WorkflowList workflows={workflows} loading={loading} onToggle={handleToggle} onDelete={handleDelete} />

      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-slide-down">
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        </div>
      )}
    </div>
  );
};

export default WorkflowsPage;