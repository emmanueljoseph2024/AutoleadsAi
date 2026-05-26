// src/pages/dashboard/BillingPage.tsx

import { useState, useEffect, useCallback } from 'react';
import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi';
import PricingPage from '../../components/billing/PricingPage';
import InvoiceTable from '../../components/billing/InvoiceTable';
import CancelSubscriptionModal from '../../components/billing/CancelSubscriptionModal';
import Toast from '../../components/common/Toast';
import { API_ENDPOINTS } from '../../utils/constants';
import api from '../../services/api';

const BillingPage = () => {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCancel, setShowCancel] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fetchInvoices = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get(API_ENDPOINTS.BILLING.INVOICES);
      setInvoices(data.invoices || []);
    } catch (err: any) {
      setError('Failed to load invoices.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchInvoices(); }, [fetchInvoices]);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div><h1 className="text-xl sm:text-2xl font-bold text-[#111827]">Billing</h1></div>

      {error && (
        <div className="p-4 bg-[#FEE2E2] border border-[#EF4444]/20 rounded-xl flex items-center gap-3 text-[#EF4444] text-sm">
          <FiAlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
          <button onClick={fetchInvoices} className="ml-auto flex items-center gap-1.5 text-[#2563EB] hover:underline font-medium">
            <FiRefreshCw className="w-4 h-4" /> Retry
          </button>
        </div>
      )}

      <PricingPage />

      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-bold text-[#111827] mb-4">Invoices</h3>
        <InvoiceTable invoices={invoices} loading={loading} />
      </div>

      <CancelSubscriptionModal
        isOpen={showCancel}
        onClose={() => setShowCancel(false)}
        onCancelled={() => setToast({ message: 'Subscription cancelled.', type: 'success' })}
      />

      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-slide-down">
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        </div>
      )}
    </div>
  );
};

export default BillingPage;