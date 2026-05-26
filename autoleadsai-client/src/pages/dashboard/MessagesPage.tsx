// src/pages/dashboard/MessagesPage.tsx

import { useState, useEffect, useCallback } from 'react';
import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi';
import MessageTemplateList from '../../components/messages/MessageTemplateList';
import MessageGenerator from '../../components/messages/MessageGenerator';
import Tabs from '../../components/common/Tabs';
import Toast from '../../components/common/Toast';
import { API_ENDPOINTS } from '../../utils/constants';
import api from '../../services/api';

const MessagesPage = () => {
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fetchTemplates = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (activeTab !== 'all') params.append('platform', activeTab);
      const { data } = await api.get(`${API_ENDPOINTS.MESSAGES.BASE}?${params.toString()}`);
      setTemplates(data.templates || []);
    } catch (err: any) {
      setError('Failed to load templates.');
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => { fetchTemplates(); }, [fetchTemplates]);

  const tabs = [
    { key: 'all', label: 'All' },
    { key: 'linkedin', label: 'LinkedIn' },
    { key: 'email', label: 'Email' },
    { key: 'facebook', label: 'Facebook' },
    { key: 'twitter', label: 'X' },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#111827]">Message Templates</h1>
        <p className="text-sm text-[#6B7280]">AI-generated outreach messages</p>
      </div>

      <MessageGenerator onMessageGenerated={fetchTemplates} />

      {error && (
        <div className="p-4 bg-[#FEE2E2] border border-[#EF4444]/20 rounded-xl flex items-center gap-3 text-[#EF4444] text-sm">
          <FiAlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
          <button onClick={fetchTemplates} className="ml-auto flex items-center gap-1.5 text-[#2563EB] hover:underline font-medium">
            <FiRefreshCw className="w-4 h-4" /> Retry
          </button>
        </div>
      )}

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      <MessageTemplateList templates={templates} loading={loading} />

      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-slide-down">
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        </div>
      )}
    </div>
  );
};

export default MessagesPage;