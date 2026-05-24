import { useState } from 'react';
import { FiX, FiAlertTriangle } from 'react-icons/fi';
import api from '../../services/api';

interface CancelSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCancelled: () => void;
}

const reasons = [
  'Too expensive',
  'Not getting enough leads',
  'Missing features I need',
  'Switching to another tool',
  'Not using it enough',
  'Other',
];

const CancelSubscriptionModal = ({ isOpen, onClose, onCancelled }: CancelSubscriptionModalProps) => {
  const [selectedReason, setSelectedReason] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleCancel = async () => {
    setLoading(true);
    try {
      await api.post('/billing/cancel', {
        reason: selectedReason,
        feedback,
      });
      onCancelled();
      onClose();
    } catch (err) {
      console.error('Cancellation failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl border border-[#E5E7EB] p-6 sm:p-8 w-full max-w-md">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#9CA3AF] hover:text-[#111827] transition-colors"
        >
          <FiX className="w-5 h-5" />
        </button>

        {/* Warning Icon */}
        <div className="w-12 h-12 bg-[#FEF3C7] rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FiAlertTriangle className="w-6 h-6 text-[#F59E0B]" />
        </div>

        <h2 className="text-xl font-bold text-[#111827] text-center mb-2">Cancel Subscription</h2>
        <p className="text-sm text-[#6B7280] text-center mb-6">
          Your subscription will remain active until the end of your current billing period.
        </p>

        {/* Reasons */}
        <div className="space-y-2 mb-6">
          <p className="text-sm font-medium text-[#374151]">Help us improve — why are you canceling?</p>
          {reasons.map((reason) => (
            <button
              key={reason}
              onClick={() => setSelectedReason(reason)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all ${
                selectedReason === reason
                  ? 'bg-[#EFF6FF] text-[#2563EB] font-medium border border-[#2563EB]/30'
                  : 'bg-[#F9FAFB] text-[#374151] border border-[#E5E7EB] hover:border-[#D1D5DB]'
              }`}
            >
              {reason}
            </button>
          ))}
        </div>

        {/* Additional Feedback */}
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Any additional feedback? (optional)"
          rows={3}
          className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent resize-none mb-6"
        />

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-white border border-[#D1D5DB] rounded-xl text-sm font-medium text-[#374151] hover:bg-[#F9FAFB] transition-colors"
          >
            Keep Subscription
          </button>
          <button
            onClick={handleCancel}
            disabled={loading}
            className="flex-1 py-2.5 bg-[#EF4444] text-white rounded-xl text-sm font-semibold hover:bg-[#DC2626] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Canceling...
              </>
            ) : (
              'Cancel Subscription'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelSubscriptionModal;