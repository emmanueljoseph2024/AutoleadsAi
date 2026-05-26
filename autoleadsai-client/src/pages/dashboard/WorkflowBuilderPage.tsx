// src/pages/dashboard/WorkflowBuilderPage.tsx

import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiAlertCircle, FiRefreshCw } from 'react-icons/fi';
import WorkflowBuilder from '../../components/workflows/WorkflowBuilder';
import Spinner from '../../components/common/Spinner';
import Toast from '../../components/common/Toast';
import { API_ENDPOINTS } from '../../utils/constants';
import api from '../../services/api';

const WorkflowBuilderPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = !id || id === 'new';

  const [name, setName] = useState('');
  const [trigger, setTrigger] = useState({ type: 'new_lead', config: {} });
  const [steps, setSteps] = useState<any[]>([]);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fetchWorkflow = useCallback(async () => {
    if (isNew) return;
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get(API_ENDPOINTS.WORKFLOWS.BY_ID(id!));
      setName(data.workflow.name);
      setTrigger(data.workflow.trigger);
      setSteps(data.workflow.steps || []);
    } catch (err: any) {
      setError('Failed to load workflow.');
    } finally {
      setLoading(false);
    }
  }, [id, isNew]);

  useEffect(() => { fetchWorkflow(); }, [fetchWorkflow]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = { name, trigger, steps };
      if (isNew) {
        const { data } = await api.post(API_ENDPOINTS.WORKFLOWS.BASE, payload);
        navigate(`/workflows/${data.workflow._id}/build`, { replace: true });
      } else {
        await api.put(API_ENDPOINTS.WORKFLOWS.BY_ID(id!), payload);
      }
      setToast({ message: 'Workflow saved!', type: 'success' });
    } catch (err: any) {
      setToast({ message: 'Failed to save workflow.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleTest = async () => {
    setTesting(true);
    try {
      await api.post(`/workflows/${id}/test`);
      setToast({ message: 'Test passed!', type: 'success' });
    } catch (err: any) {
      setToast({ message: err?.response?.data?.error || 'Test failed.', type: 'error' });
    } finally {
      setTesting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <button onClick={() => navigate('/workflows')} className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#2563EB] transition-colors">
        <FiArrowLeft className="w-4 h-4" />Back to Workflows
      </button>

      {error && (
        <div className="p-4 bg-[#FEE2E2] border border-[#EF4444]/20 rounded-xl flex items-center gap-3 text-[#EF4444] text-sm">
          <FiAlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
          <button onClick={fetchWorkflow} className="ml-auto flex items-center gap-1.5 text-[#2563EB] hover:underline font-medium">
            <FiRefreshCw className="w-4 h-4" /> Retry
          </button>
        </div>
      )}

      <WorkflowBuilder
        name={name}
        onNameChange={setName}
        trigger={trigger}
        onTriggerChange={setTrigger}
        steps={steps}
        onStepsChange={setSteps}
        onSave={handleSave}
        onTest={handleTest}
        saving={saving}
        testing={testing}
      />

      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-slide-down">
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        </div>
      )}
    </div>
  );
};

export default WorkflowBuilderPage;